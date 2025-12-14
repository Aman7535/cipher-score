"use client";

type HeaderProps = {
  connected: boolean;
  address?: string | null;
  connect: () => void;
  disconnect: () => void;
};

export default function Header({
  connected,
  address,
  connect,
  disconnect,
}: HeaderProps) {
  const shortAddress =
    address && `${address.slice(0, 6)}…${address.slice(-4)}`;

  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">CipherScore</h1>
        <p className="text-sm text-slate-500">
          Privacy-preserving credit scoring
        </p>
      </div>

      {connected ? (
        <button
          onClick={disconnect}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          {shortAddress}
        </button>
      ) : (
        <button
          onClick={connect}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
}
