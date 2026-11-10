// Client-side IndexedDB manager for local video files (MP4, WebM, MOV)
// This avoids browser localStorage 5MB quota and supports large video files.

const DB_NAME = "LMS_Videos_Database";
const STORE_NAME = "local_video_files";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const objectUrlCache = new Map<string, string>();

export async function saveLocalVideo(id: string, file: File | Blob): Promise<string> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ id, file, name: (file as File).name || id, date: new Date().toISOString() });

      req.onsuccess = () => {
        // Create an Object URL for immediate smooth playback
        const objectUrl = URL.createObjectURL(file);
        objectUrlCache.set(id, objectUrl);
        resolve(`localvideo://${id}`);
      };

      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn("IndexedDB save failed, falling back to temporary Object URL", e);
    const objectUrl = URL.createObjectURL(file);
    objectUrlCache.set(id, objectUrl);
    return `localvideo://${id}`;
  }
}

export async function getLocalVideoUrl(id: string): Promise<string | null> {
  // Check in-memory active cache first
  if (objectUrlCache.has(id)) {
    return objectUrlCache.get(id)!;
  }

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        if (req.result && req.result.file) {
          const url = URL.createObjectURL(req.result.file);
          objectUrlCache.set(id, url);
          resolve(url);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error("Error retrieving video from IndexedDB", e);
    return null;
  }
}

export async function deleteLocalVideo(id: string): Promise<void> {
  if (objectUrlCache.has(id)) {
    URL.revokeObjectURL(objectUrlCache.get(id)!);
    objectUrlCache.delete(id);
  }

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
  } catch (e) {
    console.error("Failed to delete local video from IndexedDB", e);
  }
}
