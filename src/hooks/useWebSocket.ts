import { useEffect, useRef, useCallback, useState } from 'react';

export type ConnectionStatus = 'connecting' | 'open' | 'closed' | 'reconnecting';

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  shouldConnect?: boolean;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

export const useWebSocket = (url: string | null, options: UseWebSocketOptions = {}) => {
  const [status, setStatus] = useState<ConnectionStatus>('closed');
  const ws = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const reconnectTimer = useRef<any>(null);
  
  const { 
    onMessage, 
    onOpen, 
    onClose, 
    onError, 
    shouldConnect = true,
    reconnectAttempts = 10,
    reconnectInterval = 1000
  } = options;

  const connect = useCallback(() => {
    if (!url || !shouldConnect) {
      setStatus('closed');
      return;
    }

    // Close existing connection if any
    if (ws.current) {
      ws.current.onclose = null;
      ws.current.close();
    }

    setStatus(reconnectCount.current > 0 ? 'reconnecting' : 'connecting');
    
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setStatus('open');
        reconnectCount.current = 0;
        onOpen?.();
      };

      ws.current.onmessage = (event) => {
        onMessage?.(event.data);
      };

      ws.current.onclose = () => {
        setStatus('closed');
        onClose?.();
        
        if (shouldConnect && reconnectCount.current < reconnectAttempts) {
          // Exponential backoff: 1s, 2s, 4s, 8s... up to 30s
          const delay = Math.min(reconnectInterval * Math.pow(2, reconnectCount.current), 30000);
          reconnectCount.current += 1;
          
          if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
          reconnectTimer.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };

      ws.current.onerror = (error) => {
        onError?.(error);
      };
    } catch (err) {
      console.error('WebSocket connection error:', err);
      setStatus('closed');
    }
  }, [url, shouldConnect, onMessage, onOpen, onClose, onError, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      if (ws.current) {
        ws.current.onclose = null; // Prevent reconnection on manual close
        ws.current.close();
        ws.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((data: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(typeof data === 'string' ? data : JSON.stringify(data));
    }
  }, []);

  return { ws: ws.current, sendMessage, status };
};
