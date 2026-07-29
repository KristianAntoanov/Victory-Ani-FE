import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DatePicker.module.css';

type DatePickerProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  allowClear?: boolean;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  testId?: string;
};

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value?: string) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return toIsoDate(date) === value ? date : null;
}

function parseTypedDate(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const iso = parseIsoDate(trimmed);
  if (iso) return toIsoDate(iso);

  const match = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(trimmed);
  if (!match) return null;

  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return date.getFullYear() === Number(match[3]) &&
    date.getMonth() === Number(match[2]) - 1 &&
    date.getDate() === Number(match[1])
    ? toIsoDate(date)
    : null;
}

function formatDisplay(value: string) {
  const date = parseIsoDate(value);
  if (!date) return '';
  return new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function isBeforeDay(a: Date, b: Date) {
  return toIsoDate(a) < toIsoDate(b);
}

function isAfterDay(a: Date, b: Date) {
  return toIsoDate(a) > toIsoDate(b);
}

export default function DatePicker({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Избери дата',
  disabled = false,
  minDate,
  maxDate,
  allowClear = false,
  className,
  inputRef,
  testId,
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseIsoDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(formatDisplay(value));
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? new Date());

  const min = parseIsoDate(minDate);
  const max = parseIsoDate(maxDate);
  const todayIso = toIsoDate(new Date());
  const selectedIso = selectedDate ? toIsoDate(selectedDate) : '';

  useEffect(() => {
    setDraftValue(formatDisplay(value));
    const nextDate = parseIsoDate(value);
    if (nextDate) setVisibleMonth(nextDate);
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const offset = (firstDay.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - offset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [visibleMonth]);

  const monthLabel = new Intl.DateTimeFormat('bg-BG', {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth);

  const changeMonth = (step: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  };

  const commitTypedValue = () => {
    const parsed = parseTypedDate(draftValue);
    if (parsed === null) {
      setDraftValue(formatDisplay(value));
      onBlur?.();
      return;
    }

    onChange(parsed);
    onBlur?.();
  };

  const selectDate = (date: Date) => {
    onChange(toIsoDate(date));
    setIsOpen(false);
    onBlur?.();
  };

  const clearDate = () => {
    onChange('');
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <div ref={rootRef} className={`${styles.root}${className ? ` ${className}` : ''}`}>
      <div className={styles.field}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={styles.input}
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onBlur={commitTypedValue}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={testId}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        />
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen((open) => !open)}
          disabled={disabled}
          aria-label="Отвори календар"
        >
          <CalendarDays size={18} strokeWidth={1.9} />
        </button>
      </div>

      {isOpen && !disabled ? (
        <div className={styles.dropdown} role="dialog" aria-label="Календар">
          <div className={styles.header}>
            <button type="button" className={styles.headerButton} onClick={() => changeMonth(-1)} aria-label="Предишен месец">
              <ChevronLeft size={18} />
            </button>
            <div className={styles.monthLabel}>{monthLabel}</div>
            <button type="button" className={styles.headerButton} onClick={() => changeMonth(1)} aria-label="Следващ месец">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {weekdays.map((weekday) => (
              <span key={weekday} className={styles.weekday}>
                {weekday}
              </span>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((date) => {
              const iso = toIsoDate(date);
              const isOutside = date.getMonth() !== visibleMonth.getMonth();
              const isDisabled = Boolean((min && isBeforeDay(date, min)) || (max && isAfterDay(date, max)));
              const classNames = [
                styles.day,
                isOutside ? styles.dayOutside : '',
                iso === todayIso ? styles.today : '',
                iso === selectedIso ? styles.selected : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={iso}
                  type="button"
                  className={classNames}
                  onClick={() => selectDate(date)}
                  disabled={isDisabled}
                  aria-pressed={iso === selectedIso}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {allowClear && value ? (
            <div className={styles.footer}>
              <button type="button" className={styles.clearButton} onClick={clearDate}>
                Изчисти
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
