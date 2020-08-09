import React from 'react';
import styles from './timeline.module.css';
import clsx from 'clsx';

interface TimelineProps {
  items: { title: string; description: string; secondaryDescription: React.ReactNode }[];
}

interface TimelineItemProps {
  position: 'left' | 'right';
  title: string;
  description: string;
  secondaryDescription: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  position,
  title,
  description,
  secondaryDescription,
}) => (
  <li
    className={clsx(
      'flex',
      'flex-col',
      'w-full',
      'sm:w-1/2',
      'text-center',
      'my-5',
      'py-5',
      'relative',
      'bg-gray-100',
      'sm:bg-transparent',
      'z-10',
      position === 'left' && 'ml-auto'
    )}
  >
    <span>
      <b>{title}</b>
    </span>
    <span className="mt-1">{description}</span>
    <span className="text-sm italic text-gray-700 mt-1">{secondaryDescription}</span>
    <span
      className={clsx(
        styles.timeline__dot,
        'hidden',
        'sm:flex',
        position === 'left' && styles.timeline__dot__left,
        position === 'right' && styles.timeline__dot__right
      )}
    />
  </li>
);

const Timeline: React.FC<TimelineProps> = ({ items }) => (
  <ul className={styles.timeline}>
    {items.map((item, i) => (
      <TimelineItem
        key={item.title}
        position={Number.isInteger(i / 2) ? 'right' : 'left'}
        {...item}
      />
    ))}
  </ul>
);

export default Timeline;
