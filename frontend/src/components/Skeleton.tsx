import styles from './Skeleton.module.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
    className?: string;
}

/**
 * Loading skeleton component for content placeholders
 */
export function Skeleton({
    width = '100%',
    height = '1rem',
    variant = 'text',
    className = '',
}: SkeletonProps) {
    const style = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
        <div
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={style}
            aria-label="Loading..."
        />
    );
}

/**
 * Skeleton for job cards
 */
export function JobCardSkeleton() {
    return (
        <div className={styles.jobCard}>
            <div className={styles.header}>
                <Skeleton variant="circular" width={48} height={48} />
                <div className={styles.headerText}>
                    <Skeleton width="60%" height="1.25rem" />
                    <Skeleton width="40%" height="1rem" />
                </div>
            </div>
            <Skeleton height="3rem" />
            <div className={styles.footer}>
                <Skeleton width="30%" />
                <Skeleton width="20%" />
            </div>
        </div>
    );
}

/**
 * Skeleton for profile section
 */
export function ProfileSkeleton() {
    return (
        <div className={styles.profile}>
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton width="50%" height="1.5rem" />
            <Skeleton width="30%" height="1rem" />
        </div>
    );
}

export default Skeleton;
