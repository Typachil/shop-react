import { useState, useCallback } from 'react';

/**
 * Пользовательский хук, который отправляет запросы с помощью интерфейса Fetch API
 * @param {boolean} loading - Состояние загрузки
 * @param {string} error - Состояние ошибок
 * @param {function} request - Функция, которая создает запрос по переданным параметрам
 * @param {function} clearError - Функция, которая отчищает ошибки
 */

export default function useHttp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setLoading(true);
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setTimeout(() => setLoading(false), 1000);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}
