'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/config/api';
import { 
  Camera, 
  Upload, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

interface ProfilePhotoUploadProps {
  isLight?: boolean;
}

export default function ProfilePhotoUpload({ isLight = false }: ProfilePhotoUploadProps) {
  const { user, token, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) return null;

  const currentPhotoUrl = user.profile_image_url || (user.avatar && !user.avatar.includes('unsplash') ? user.avatar : null);
  const hasPhoto = Boolean(user.profile_image_key || currentPhotoUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setSuccessMsg('');

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Client-side Validation: File type
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    const isValidType = ALLOWED_TYPES.includes(fileType) || 
      ['.jpg', '.jpeg', '.png', '.webp'].some(ext => fileName.endsWith(ext));

    if (!isValidType) {
      setErrorMsg('Invalid file format. Only JPG, JPEG, PNG, and WEBP images are allowed.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Client-side Validation: File size (5MB limit)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg('File size exceeds 5 MB. Please select a smaller image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Generate local preview URL
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const cancelPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile || !token) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const res = await fetch(getApiUrl('/api/profile/photo'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Profile photo updated successfully.');
        updateUser({
          profile_image_key: data.profile_image_key,
          profile_image_url: data.profile_image_url,
          avatar: data.profile_image_url || data.avatar
        });
        cancelPreview();
      } else {
        setErrorMsg(data.message || 'Unable to upload profile photo. Please try again.');
      }
    } catch (err) {
      console.error('[Upload Error]:', err);
      setErrorMsg('Unable to upload profile photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!token) return;

    const confirmed = window.confirm('Are you sure you want to remove your profile photo?');
    if (!confirmed) return;

    setDeleting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(getApiUrl('/api/profile/photo'), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Profile photo removed successfully.');
        updateUser({
          profile_image_key: null,
          profile_image_url: null,
          avatar: undefined
        });
      } else {
        setErrorMsg(data.message || 'Unable to remove profile photo. Please try again.');
      }
    } catch (err) {
      console.error('[Delete Error]:', err);
      setErrorMsg('Unable to remove profile photo. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Messages */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Avatar & Actions Row */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        
        {/* Avatar Display */}
        <div className="relative group shrink-0">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 flex items-center justify-center shadow-xl transition-all ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-navy-900 border-white/20'
          }`}>
            {currentPhotoUrl ? (
              <img
                src={currentPhotoUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-cyan-500 to-sky-300 text-slate-950 flex items-center justify-center font-serif font-bold text-4xl shadow-inner">
                {user.name ? user.name[0].toUpperCase() : 'P'}
              </div>
            )}
          </div>

          {/* Quick Overlay Camera Badge */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || deleting}
            className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg border-2 border-slate-900 transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
            title={hasPhoto ? 'Change Photo' : 'Upload Photo'}
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls & Description */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h3 className={`text-base font-serif font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Profile Picture
          </h3>
          <p className={`text-xs max-w-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Upload a high-resolution JPG, JPEG, PNG or WEBP image (max 5 MB). Stored securely in private cloud storage.
          </p>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Button Group */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
            {hasPhoto ? (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || deleting}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 shadow-sm ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300' 
                      : 'bg-navy-800 hover:bg-navy-700 text-cyan-300 border-white/10'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  disabled={uploading || deleting}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all flex items-center space-x-1.5 shadow-sm disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Remove Profile Photo</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || deleting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Profile Photo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview & Upload Confirmation Modal/Card */}
      {selectedFile && previewUrl && (
        <div className={`p-4 rounded-2xl border space-y-3 mt-4 animate-in fade-in zoom-in-95 ${
          isLight ? 'bg-slate-50 border-cyan-500/40 shadow-lg' : 'bg-navy-950/90 border-cyan-500/40 shadow-2xl'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ImageIcon className="w-4 h-4" />
              <span>Image Preview</span>
            </span>
            <button
              onClick={cancelPreview}
              className="text-slate-400 hover:text-white p-1 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30 shadow-md shrink-0"
            />
            <div className="text-xs space-y-1 overflow-hidden">
              <p className={`font-semibold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {selectedFile.name}
              </p>
              <p className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Image'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={cancelPreview}
              disabled={uploading}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                isLight ? 'bg-white border-slate-300 text-slate-700' : 'bg-navy-800 border-white/10 text-slate-300'
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUploadSubmit}
              disabled={uploading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Confirm Upload</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
