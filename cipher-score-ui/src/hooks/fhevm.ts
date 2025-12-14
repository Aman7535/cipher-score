export function useFhevm() {
  return {
    ready: true,
    encrypt32: async (v: number) => v,
    decrypt32: async (v: number) => v,
    decryptBool: async (v: boolean) => v
  };
}