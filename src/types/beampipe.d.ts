export {};

declare global {
    interface Window {
        beampipe: beampipeMetric | null;
    }
}

type beampipeMetric = (m: string) => void;
