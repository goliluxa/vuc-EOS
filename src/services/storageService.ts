export interface ApiStorageFolder {
  id: string;
  name: string;
  space: string;
  owner_id?: string | null;
  parent_id?: string | null;
  created_at: string;
}

export interface ApiStorageFile {
  id: string;
  original_name: string;
  space: string;
  owner_id?: string | null;
  folder_id?: string | null;
  mime_type: string;
  extension: string;
  file_size: number;
  created_at: string;
}

export interface StorageContent {
  current_folder_id: string | null;
  folders: ApiStorageFolder[];
  files: ApiStorageFile[];
}

export const storageService = {
  async getContent(parentId: string | null = null, space = 'SHARED', ownerId?: string): Promise<StorageContent> {
    const params = new URLSearchParams();
    if (parentId) params.append('parent_id', parentId);
    params.append('space', space);
    if (ownerId) params.append('owner_id', ownerId);

    try {
      const resp = await fetch(`/api/storage/content?${params.toString()}`);
      if (resp.ok) {
        return await resp.json();
      }
    } catch {}

    // Fallback if backend is warming up
    return {
      current_folder_id: parentId,
      folders: [
        { id: 'f-1', name: 'Учебные пособия и уставы', space: 'SHARED', created_at: '2026-11-02' },
        { id: 'f-2', name: 'Служебная документация', space: 'SHARED', created_at: '2026-11-06' },
        { id: 'f-3', name: 'Приказы и директивы начальника ВУЦ', space: 'SHARED', created_at: '2026-11-01' },
      ],
      files: [
        { id: 'doc-1', original_name: 'Боевой_устав_СВ_Часть_3.pdf', space: 'SHARED', mime_type: 'application/pdf', extension: 'PDF', file_size: 15518976, created_at: '2026-11-03' },
        { id: 'doc-2', original_name: 'Строевой_устав_ВС_РФ_2024.pdf', space: 'SHARED', mime_type: 'application/pdf', extension: 'PDF', file_size: 6501171, created_at: '2026-10-28' },
      ],
    };
  },

  async createFolder(name: string, parentId: string | null = null, space = 'SHARED', ownerId?: string): Promise<ApiStorageFolder | null> {
    try {
      const resp = await fetch('/api/storage/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, parent_id: parentId, space, owner_id: ownerId }),
      });
      if (resp.ok) return await resp.json();
    } catch {}
    return null;
  },

  async uploadFile(file: File, folderId: string | null = null, space = 'SHARED', ownerId?: string): Promise<ApiStorageFile | null> {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) formData.append('folder_id', folderId);
    formData.append('space', space);
    if (ownerId) formData.append('owner_id', ownerId);

    try {
      const resp = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      });
      if (resp.ok) return await resp.json();
    } catch {}
    return null;
  },

  getDownloadUrl(fileId: string): string {
    return `/api/storage/files/${fileId}/download`;
  },

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      const resp = await fetch(`/api/storage/files/${fileId}`, { method: 'DELETE' });
      return resp.ok;
    } catch {
      return false;
    }
  },

  async deleteFolder(folderId: string): Promise<boolean> {
    try {
      const resp = await fetch(`/api/storage/folders/${folderId}`, { method: 'DELETE' });
      return resp.ok;
    } catch {
      return false;
    }
  },
};
