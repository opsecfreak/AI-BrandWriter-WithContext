"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BrandContextItem { id: string; businessName: string; }
interface SocialAccount { id: string; provider: string; handle: string|null; displayName: string|null; brandContextId: string; }

export default function ConnectAccountsPage() {
  const [brands, setBrands] = useState<BrandContextItem[]>([]);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [mockHandle, setMockHandle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBrands(); fetchAccounts(); }, []);

  const fetchBrands = async () => {
    const res = await fetch('/api/brand-context');
    const json = await res.json();
    if (json.status === 200) setBrands(json.data);
  };

  const fetchAccounts = async () => {
    const res = await fetch('/api/social-accounts');
    if (res.ok) {
      const json = await res.json();
      setAccounts(json.data || []);
    }
  };

  const connectTwitter = async () => {
    if (!selectedBrand) return alert('Select a brand first');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/twitter', { method: 'POST', body: JSON.stringify({ brandContextId: selectedBrand, mockHandle }) });
      const json = await res.json();
      if (res.ok) { fetchAccounts(); setMockHandle(''); }
      else alert(json.message || 'Failed');
    } finally { setLoading(false); }
  };

  const brandAccounts = accounts.filter(a => a.brandContextId === selectedBrand);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">🔗 Connect Accounts</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium mb-4">1. Select Brand</h2>
          <select value={selectedBrand} onChange={e=>setSelectedBrand(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            <option value="">-- Choose Brand --</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.businessName}</option>)}
          </select>
          {selectedBrand && (
            <p className="mt-2 text-xs text-gray-500">Accounts linked will share this brand's context for generation & posting.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">2. Available Integrations</h2>
            <p className="text-xs text-gray-500">Twitter active (mock). Facebook & YouTube placeholders.</p>
          </div>

          <div className="space-y-4">
            {/* Twitter Card */}
            <div className="border rounded-md p-4 flex items-start justify-between">
              <div>
                <h3 className="font-medium flex items-center">🐦 Twitter <span className="ml-2 text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Text</span></h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">OAuth 2.0 user-auth to post tweets on behalf of user. Stores access + optional refresh tokens scoped to tweet.read tweet.write.</p>
                <div className="mt-2 text-xs">
                  Status: {accounts.some(a=>a.provider==='twitter' && a.brandContextId===selectedBrand) ? <span className="text-green-600 font-medium">Connected</span> : <span className="text-red-600">Not Connected</span>}
                </div>
                {brandAccounts.filter(a=>a.provider==='twitter').map(acc => (
                  <div key={acc.id} className="mt-2 text-xs bg-gray-100 inline-block px-2 py-1 rounded">{acc.handle || acc.displayName}</div>
                ))}
              </div>
              <div className="w-48 text-right">
                <input value={mockHandle} onChange={e=>setMockHandle(e.target.value)} placeholder="@handle" className="w-full text-xs border rounded px-2 py-1 mb-2" />
                <button disabled={!selectedBrand||loading} onClick={connectTwitter} className="w-full text-xs bg-indigo-600 text-white rounded px-3 py-2 disabled:opacity-40 hover:bg-indigo-700">{loading? 'Connecting...' : 'Connect Twitter'}</button>
              </div>
            </div>

            {/* Facebook Placeholder */}
            <div className="border rounded-md p-4 flex items-start justify-between opacity-60">
              <div>
                <h3 className="font-medium flex items-center">📘 Facebook <span className="ml-2 text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Soon</span></h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">Will use Facebook Login + Pages API (pages_manage_posts) to post Page updates.</p>
              </div>
              <div className="w-40 text-right">
                <button disabled className="w-full text-xs bg-gray-300 text-gray-600 rounded px-3 py-2">Pending</button>
              </div>
            </div>

            {/* YouTube Placeholder */}
            <div className="border rounded-md p-4 flex items-start justify-between opacity-60">
              <div>
                <h3 className="font-medium flex items-center">▶ YouTube <span className="ml-2 text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Soon</span></h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">Will leverage Google OAuth 2.0 + YouTube Data API (youtube.upload, youtube.readonly).</p>
              </div>
              <div className="w-40 text-right">
                <button disabled className="w-full text-xs bg-gray-300 text-gray-600 rounded px-3 py-2">Pending</button>
              </div>
            </div>
          </div>
        </div>

        {selectedBrand && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-medium mb-2">3. Connected Accounts for Brand</h2>
            {brandAccounts.length === 0 ? (
              <p className="text-xs text-gray-500">No accounts connected yet.</p>
            ) : (
              <ul className="text-xs space-y-1">
                {brandAccounts.map(a => (
                  <li key={a.id} className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded">
                    <span>{a.provider}: {a.handle || a.displayName}</span>
                    <span className="text-green-600">Connected</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium mb-2">Security & Key Requirements</h2>
          <ul className="text-xs list-disc pl-5 space-y-1 text-gray-600">
            <li>Tokens stored server-side (encrypt at rest in production).</li>
            <li>Use PKCE for public clients (Next.js) – server exchanges code.</li>
            <li>Scope minimization: request only publish scopes.</li>
            <li>Rotate & refresh tokens automatically before expiry.</li>
            <li>Never expose access tokens to client JS; use server routes to post.</li>
          </ul>
          <div className="mt-4 text-xs text-gray-500">
            Google / YouTube requires: OAuth Consent Screen + Web Client ID + Authorized redirect URI.<br/>
            Twitter requires: Client ID/Secret, redirect URI, and enabled OAuth 2.0 scopes.<br/>
            Facebook requires: App ID/Secret, approved permissions (pages_manage_posts, pages_read_engagement).
          </div>
        </div>
      </div>
    </div>
  );
}
