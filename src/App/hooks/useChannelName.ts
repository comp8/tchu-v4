import { useSessionStorageState } from "../../hooks/usePersistentState";

export function useChannelName() {
  return useSessionStorageState<string>('channel', '');
}