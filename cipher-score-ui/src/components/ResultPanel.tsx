type ResultPanelProps = {
  status: "idle" | "pending" | "confirmed" | "error";
  txHash: string | null;
  approved: boolean | null;
};

export default function ResultPanel({
  status,
  txHash,
  approved,
}: ResultPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-6">
      <h2 className="text-lg font-semibold mb-4">
        Result
      </h2>

      {status === "idle" && (
        <p className="text-slate-500 text-sm">
          Submit a transaction to see the result.
        </p>
      )}

      {status === "pending" && (
        <p className="text-indigo-600 font-medium">
          Transaction pending…
        </p>
      )}

      {status === "confirmed" && (
        <div className="space-y-4">
          {approved ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-semibold">
                Approved ✅
              </p>
              <p className="text-sm text-green-700 mt-1">
                The encrypted score met the approval threshold.
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-semibold">
                Not approved ❌
              </p>
              <p className="text-sm text-red-700 mt-1">
                The encrypted score did not meet the approval
                threshold.
              </p>
            </div>
          )}

          {txHash && (
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-indigo-600 underline text-sm"
            >
              View transaction on BaseScan →
            </a>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
            <strong>What happened?</strong>
            <p className="mt-1">
              The smart contract evaluated your encrypted
              inputs and computed an approval decision.
              Individual inputs are never revealed only the
              final result is public.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">
            Transaction failed ❌
          </p>
          <p className="text-sm text-red-700 mt-1">
            Something went wrong while processing the
            transaction. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
