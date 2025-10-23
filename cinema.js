(function() {
    'use strict';

    // Инициализация для TV-платформы
    Lampa.Platform.tv();

    // Проверка доступности Lampa и настройка
    var checkInterval = setInterval(function() {
        if (typeof Lampa !== 'undefined') {
            clearInterval(checkInterval);

            // Проверка источника манифеста
            if (Lampa.Manifest.origin !== 'bylampa') {
                Lampa.Noty.show('Ошибка доступа');
                return;
            }

            // Проверка и установка ключа lampac_unic_id
            var currentKey = Lampa.Storage.get('lampac_unic_id', '');
            if (currentKey !== 'tyusdt') {
                Lampa.Storage.set('lampac_unic_id', 'tyusdt');
            }

            // Асинхронная загрузка внешнего скрипта
            Lampa.Utils.putScriptAsync('/local/online.js', function() {
                console.log('Скрипт online.js успешно загружен');
            });

            // Добавление кастомных постеров (новый функционал)
            Lampa.Listener.follow('full', function(e) {
                if (e.type === 'complite') {
                    var items = e.object;
                    items.forEach(function(item) {
                        // Кастомные постеры для конкретных фильмов
                        switch (item.title) {
                            case 'Полный провал: трагедия на фестивале Astroworld':
                                item.poster = 'https://image.tmdb.org/t/p/w500/8319401_1760896924.jpg';
                                item.backdrop = 'https://image.tmdb.org/t/p/original/astroworld-backdrop.jpg';
                                item.rating = 6.7;
                                break;
                            case 'Анатомия хаоса':
                                item.poster = 'https://www.themoviedb.org/t/p/w500/kaosun-anatomisi-poster.jpg';
                                item.backdrop = 'https://www.themoviedb.org/t/p/original/kaosun-backdrop.jpg';
                                item.rating = 6.0;
                                break;
                            case 'Девушка из будущего':
                                item.poster = 'https://image.tmdb.org/t/p/w500/girl-from-tomorrow-poster.jpg';
                                item.backdrop = 'https://image.tmdb.org/t/p/original/girl-tomorrow-backdrop.jpg';
                                item.rating = 7.5;
                                break;
                        }
                        // Если постера нет, используем плейсхолдер
                        if (!item.poster || item.poster.includes('placeholder')) {
                            item.poster = 'https://via.placeholder.com/500x750?text=Нет+постера';
                        }
                    });
                    e.object = items;
                }
            });
        }
    }, 200); // Проверка каждые 200 мс
})();