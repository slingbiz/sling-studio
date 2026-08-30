import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {hasStudioSession, initialUrl} from '../../../shared/constants/AppConst';

const Error404 = () => {
  const router = useRouter();

  useEffect(() => {
    if (!hasStudioSession()) {
      window.location.replace('/signin');
    }
  }, []);

  if (typeof window !== 'undefined' && !hasStudioSession()) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff8f0',
        padding: '48px 24px',
        fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
      }}>
      <div
        style={{
          width: 'min(520px, 100%)',
          background: '#fff',
          border: '1px solid #f0e4d4',
          borderRadius: 16,
          padding: '40px 36px 32px',
        }}>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#ff9800',
          }}>
          sling.biz
        </p>
        <h1
          style={{
            margin: '0 0 10px',
            fontSize: 28,
            lineHeight: 1.2,
            fontWeight: 700,
            color: '#163a5f',
          }}>
          This page is not here
        </h1>
        <p
          style={{
            margin: '0 0 28px',
            fontSize: 14,
            lineHeight: 1.5,
            color: '#4a5d73',
          }}>
          That URL does not match a Studio page. Go back to Create, or open
          another item from the rail.
        </p>
        <button
          type='button'
          onClick={() => router.push(initialUrl)}
          style={{
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            textTransform: 'none',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            background: '#ff9800',
            color: '#fff',
            cursor: 'pointer',
          }}>
          Go to Create
        </button>
      </div>
    </div>
  );
};

export default Error404;
