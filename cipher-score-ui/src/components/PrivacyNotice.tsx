export default function PrivacyNotice() {
  return (
    <div className="md:col-span-2 bg-slate-100 rounded-xl p-6">
      <h3 className="font-semibold mb-3">
        🔒 Privacy Guarantees
      </h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-4 rounded">
          <strong>Private (never revealed)</strong>
          <ul className="list-disc ml-4 mt-2">
            <li>Individual inputs</li>
            <li>Intermediate calculations</li>
            <li>Financial attributes</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded">
          <strong>Public (visible on-chain)</strong>
          <ul className="list-disc ml-4 mt-2">
            <li>Transaction hash</li>
            <li>Final approval decision</li>
          </ul>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Demo model: This project demonstrates
        privacy-preserving decision-making. Scoring
        logic is simplified for educational purposes.
      </p>
    </div>
  );
}
