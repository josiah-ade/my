// stores/useUploadStore.ts
import { FileUpload } from "@/core/types/data.interface";
import create from "zustand";

interface UploadStore {
  uploads: FileUpload[];
  addUpload: (file: File) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  setUploadSuccess: (id: string) => void;
  setUploadError: (id: string, error: string) => void;
  retryUpload: (file: FileUpload) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploads: [],
  addUpload: (file) => {
    const id = Date.now().toString();
    set((state) => ({
      uploads: [
        ...state.uploads,
        {
          id,
          name: file.name,
          size: file.size,
          status: "uploading",
          progress: 0,
        },
      ],
    }));
  },
  updateUploadProgress: (id, progress) => {
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload.id === id ? { ...upload, progress } : upload
      ),
    }));
  },
  setUploadSuccess: (id) => {
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload.id === id ? { ...upload, status: "success" } : upload
      ),
    }));
  },
  setUploadError: (id, error) => {
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload.id === id ? { ...upload, status: "error", error } : upload
      ),
    }));
  },
  retryUpload: (file) => {
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload.id === file.id
          ? { ...upload, status: "uploading", progress: 0, error: undefined }
          : upload
      ),
    }));
  },
}));
