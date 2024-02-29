import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useParamHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  

  const set = (key: string, val: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, val)

    const item = current.toString();
    const query = item ? `?${item}` : "";
    router.push(`${pathname}${query}`);
  }

  const del = (key: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete(key)

    const item = current.toString();
    const query = item ? `?${item}` : "";
    router.push(`${pathname}${query}`);
  }

  const push = (path: string) => {
    router.push(path);
  }

  return {
    set,
    del,
    push
  }
}

export default useParamHook