"use client";

import styles from "@/components/hero/MapPin.module.css";

type MapPinProps = {
  id: string;
  label: string;
  x: number;
  y: number;
  active: boolean;
  dimmed: boolean;
  onClick: (id: string) => void;
  onHover: () => void;
  onBlur: () => void;
};

export default function MapPin({
  id,
  label,
  x,
  y,
  active,
  dimmed,
  onClick,
  onHover,
  onBlur,
}: MapPinProps) {
  return (
    <button
      type="button"
      className={`${styles.pin} ${active ? styles.pinActive : ""} ${
        dimmed ? styles.pinDimmed : ""
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(id)}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      onFocus={onHover}
      onBlur={onBlur}
      aria-label={label}
      aria-pressed={active}
      aria-disabled={dimmed}
      disabled={dimmed}
    >
      <span className={styles.pinBg} />
      <span className={styles.pinMark}>
        <span className={styles.pinIcon}>A</span>
      </span>
    </button>
  );
}
