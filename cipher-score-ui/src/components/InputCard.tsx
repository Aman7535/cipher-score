"use client";

type InputCardProps = {
  inputs: {
    x1: string;
    x2: string;
    x3: string;
    x4: string;
  };
  setInputs: (v: any) => void;
  connected: boolean;
  status: "idle" | "pending" | "confirmed" | "error";
  onCalculate: () => void;
  approvalThreshold: number;
};

export default function InputCard({
  inputs,
  setInputs,
  connected,
  status,
  onCalculate,
  approvalThreshold,
}: InputCardProps) {
  function handleChange(key: keyof typeof inputs, value: string) {
    // allow empty (for clearing input)
    if (value === ""){
      setInputs({ ...inputs, [key]: "" });
      return;
    }

     // allow only numbers
    if (!/^\d+$/.test(value)) return;

    const num = Number(value);

    // restrict to 0–10
    if (num < 0 || num > 10) return;
    
    setInputs({ ...inputs, [key]: value });
  }

  function autofillDemo() {
    setInputs({
      x1: String(Math.floor(Math.random() * 11)),
      x2: String(Math.floor(Math.random() * 11)),
      x3: String(Math.floor(Math.random() * 11)),
      x4: String(Math.floor(Math.random() * 11)),
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          CipherScore Calculator
        </h2>

        <span
          title="Each input represents a financial signal scored from 0 to 10. Higher values generally improve approval chances."
          className="text-indigo-600 text-sm cursor-help"
        >
          ⓘ What is this?
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Each input represents a financial signal scored from
        0 to 10. Higher values generally improve approval
        chances.
      </p>

      <p className="text-sm mb-2">
        <strong>Approval rule:</strong>
        <br />
        Encrypted inputs are summed on-chain. If the total
        score is <strong>{approvalThreshold}</strong> or
        higher, the user is approved.
      </p>

      <div className="space-y-3 mt-4">
        <div>
          <label className="font-medium">
            Income Stability (0–10)
          </label>
          <p className="text-xs text-slate-500">
            How stable and predictable the user’s income is
          </p>
          <input
            type="number"
            value={inputs.x1}
            onChange={(e) =>
              handleChange("x1", e.target.value)
            }
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Savings Behavior (0–10)
          </label>
          <p className="text-xs text-slate-500">
            How consistently the user saves money
          </p>
          <input
            type="number"
            value={inputs.x2}
            onChange={(e) =>
              handleChange("x2", e.target.value)
            }
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Payment History (0–10)
          </label>
          <p className="text-xs text-slate-500">
            How reliable the user is at repaying debts
          </p>
          <input
            type="number"
            value={inputs.x3}
            onChange={(e) =>
              handleChange("x3", e.target.value)
            }
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Risk Factor (0–10)
          </label>
          <p className="text-xs text-slate-500">
            Lower risk means better approval chances
          </p>
          <input
            type="number"
            value={inputs.x4}
            onChange={(e) =>
              handleChange("x4", e.target.value)
            }
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-between text-sm mt-4">
        <button
          onClick={autofillDemo}
          className="text-indigo-600 underline"
        >
          Auto-fill demo values
        </button>
        <span className="text-slate-400">
          Random demo values (0–10)
        </span>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        When you click Calculate:
        <br />
        1. Inputs are encrypted locally
        <br />
        2. Encrypted values are sent to the smart contract
        <br />
        3. Approval is computed on-chain
        <br />
        4. Only the final decision is revealed
      </p>

      <button
        onClick={onCalculate}
        disabled={!connected || status === "pending"}
        className="mt-4 w-full py-2 rounded text-white bg-indigo-600 disabled:bg-slate-400"
      >
        {status === "pending"
          ? "Transaction pending…"
          : "Calculate Score"}
      </button>
    </div>
  );
}
