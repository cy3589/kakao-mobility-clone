import axios from 'axios';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type VoidFunction = () => void;
const useInterval = (callback: VoidFunction, delay: number) => {
  const savedCallback = useRef<null | VoidFunction>(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
    return undefined;
  }, [delay]);
};

interface IData {
  type: number | string;
  height?: string;
  show?: number;
  columns?: {
    items: {
      type: number;
      value?: string;
      show: number;
      src?: string;
      imageSrc?: string;
      label?: string;
      href?: string;
      color?: string;
      width?: number;
      height?: number;
      fit?: string;
    }[];
  }[];
}
type TData = IData[];

interface IMainDashboard {
  viderSrc: string;
  value: number;
  unit: string;
}
const MainDashboard: FC<IMainDashboard> = ({ value, unit, viderSrc }) => {
  const [dashboardVideoHeight, setDashboardVideoHeight] = useState(0);
  const onCanPlay = useCallback(
    (e: SyntheticEvent<HTMLVideoElement, Event>) => {
      setDashboardVideoHeight(e.currentTarget.clientHeight);
    },
    [],
  );
  const [displayValue, setDisplayValue] = useState(0);
  useInterval(() => {
    if (displayValue >= value) return setDisplayValue(value);
    setDisplayValue(
      (prev) =>
        prev + Math.floor(value / Math.floor(Math.random() * 100 + 1000)),
    );
    return undefined;
  }, 1);

  return (
    <motion.div
      key="main_data"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <main>
        <div style={{ position: 'relative', minHeight: dashboardVideoHeight }}>
          <video
            onCanPlay={onCanPlay}
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              zIndex: -1,
              width: '100%',
              top: 0,
            }}
          >
            <source src={viderSrc} type="video/mp4" />
            <div>123123123</div>
          </video>
          <div style={{ padding: '0 24px' }}>
            <div
              style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '60px',
                color: 'rgb(255, 205, 0)',
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  height: '52px',
                  fontSize: '60px',
                  lineHeight: '52px',
                }}
              >
                we
              </div>
              <div
                style={{
                  height: '52px',
                  fontSize: '60px',
                  lineHeight: '52px',
                }}
              >
                move
              </div>
              <div
                style={{
                  height: '52px',
                  fontSize: '60px',
                  lineHeight: '52px',
                  marginTop: '0.2em',
                }}
              >
                life
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '64px' }}>
              <div>오늘 하루의 누적 이동거리</div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <div style={{ fontSize: '40px', fontWeight: 'bold' }}>
                  {displayValue.toLocaleString()}
                </div>
                <div style={{ fontSize: '22px' }}>{unit}</div>
              </div>
              <div style={{ fontSize: '22px', marginTop: '24px' }}>
                우리의 기술로 생활을 움직입니다.
              </div>
            </div>
            {/* <div
              style={{
                fontSize: '22px',
                position: 'absolute',
                bottom: 0,
                marginTop: '320px',
              }}
            >
              우리의 기술로 생활을 움직입니다.
            </div> */}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

const InitialComponent = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      position: 'fixed',
      backgroundColor: 'rgb(32, 34, 55)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'fixed',
      }}
    >
      <motion.main
        key="initial_top"
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: 'rgb(255, 205, 0)',
        }}
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 1 }}
      />
      <motion.main
        key="initial_mid"
        initial={{ opacity: 0, transform: 'scale(0.7)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        exit={{ opacity: 0, transform: 'scale(2)' }}
        transition={{ duration: 1 }}
        style={{
          height: '60px',
          color: 'rgb(255, 205, 0)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>we move life</h1>
      </motion.main>
      <motion.main
        key="initial_bottom"
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: 'rgb(255, 205, 0)',
        }}
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 1 }}
      />
    </div>
  </div>
);

const myAxios = {
  get: async (url: string) => {
    const result = await axios.post('/api/GET', { url });
    return result;
  },
  post: async (url: string, postData: unknown) => {
    const result = await axios.post('/api/POST', { url, data: postData });
    return result;
  },
};

const indexFetcher = async () => {
  const { data } = await myAxios.get(
    'https://www.kakaomobility.com/api/data/content.0.json',
  );
  return data;
};

interface Main {
  unit: string;
  updated_at: string;
  value: number;
}
const indexMainFetcher = async () => {
  const { data } = await myAxios.get(
    'https://www.kakaomobility.com/api/statistics/distances/daily?type=all',
  );
  return data;
};

const MainVideoSrc =
  'https://t1.kakaocdn.net/kakaomobility/company_website/contents/v2/0-main-1-m.mp4';

const Home: NextPage = () => {
  const { data: mainData, isLoading: isLoadingMainData } = useQuery<Main>(
    'main',
    indexMainFetcher,
  );
  const { data, isLoading } = useQuery<{ categoryId: number; rows: TData }>(
    ['/'],
    indexFetcher,
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    if (isLoadingMainData || isLoading) return undefined;
    const timeout = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoadingMainData, isLoading]);
  if (isInitialLoading || isLoadingMainData || isLoading)
    return (
      <AnimatePresence mode="wait" key="main-page">
        <InitialComponent />
      </AnimatePresence>
    );
  if (!mainData || !data)
    return (
      <AnimatePresence mode="wait" key="main-page">
        <div>Error!!!</div>
      </AnimatePresence>
    );
  return (
    <AnimatePresence mode="wait" key="main-page">
      <MainDashboard
        key="main-data"
        unit={mainData.unit}
        value={mainData.value}
        viderSrc={MainVideoSrc}
      />
    </AnimatePresence>
  );
};

export default Home;
