<div align="center">

<img src="./assets/t2-sales-hero.png" width="100%" alt="T2 Sales — продажи, команда, результат">

<img src="./assets/t2-app-logo.jpg" width="70" alt="Официальная иконка приложения T2">

<br>

[![Сайт](https://img.shields.io/badge/ОТКРЫТЬ_САЙТ-t2sales.ru-2176F5?style=for-the-badge)](https://t2sales.ru)
[![Приложение](https://img.shields.io/badge/ИЗУЧИТЬ_ПРИЛОЖЕНИЕ-GitHub-111827?style=for-the-badge&logo=github)](https://github.com/JustT1MExGOD/tele2-app)
![Landing](https://img.shields.io/badge/ПРОЕКТ-LANDING_PAGE-1957B8?style=for-the-badge)

### ONE PLATFORM. MORE POSSIBILITIES.

**Презентационный сайт цифровой экосистемы T2 Sales**

[Сайт](https://t2sales.ru) · [Приложение](https://github.com/JustT1MExGOD/tele2-app) · [Буклет](./t2sales-booklet.pdf)

</div>

---

## 01 / ПРОДУКТ

**T2 Sales** объединяет инструменты для розничных продаж, смен, планирования, аналитики и взаимодействия команды.

**t2sales-site** — отдельный презентационный сайт платформы. Его задача — не только рассказать о продукте, но и показать интерфейс и сценарии работы через динамичную визуальную подачу.

> **Продажи. Команда. Результат.** В одном цифровом пространстве.

## 02 / РЕАЛЬНЫЕ ЭКРАНЫ

<div align="center">

**Никаких концептуальных макетов — изображения загружаются из основного репозитория приложения.**

<table>
<tr>
<td align="center" width="50%"><img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/home-command-center.png" width="100%" alt="T2 Sales — командный центр"><br><b>Командный центр</b></td>
<td align="center" width="50%"><img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/profile-shift-live.png" width="100%" alt="T2 Sales — открытая смена"><br><b>Рабочая смена</b></td>
</tr>
<tr>
<td align="center"><img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/plan-day.png" width="100%" alt="T2 Sales — план дня"><br><b>План дня</b></td>
<td align="center"><img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/schedule-month.png" width="100%" alt="T2 Sales — график команды"><br><b>График команды</b></td>
</tr>
</table>

</div>

<details>
<summary><b>✦ Ещё экраны: веб, Android и нативный клиент</b></summary>
<br>

| Веб-интерфейс | Android |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/web-home.png" width="100%" alt="Веб: главная"> | <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/android-home.png" width="100%" alt="Android: главная"> |
| <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/web-supervisor.png" width="100%" alt="Веб: руководитель"> | <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/android-plan.png" width="100%" alt="Android: план"> |

| Нативный Windows-клиент | Профиль |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/desktop-home.png" width="100%" alt="Нативный клиент: главная"> | <img src="https://raw.githubusercontent.com/JustT1MExGOD/tele2-app/main/docs/screenshots/desktop-profile.png" width="100%" alt="Нативный клиент: профиль"> |

</details>

---

## 03 / ВОЗМОЖНОСТИ

| 📊 **Аналитика** | 🎯 **Планы** | 👥 **Команда** |
| :--- | :--- | :--- |
| Показатели и результаты | Цели и выполнение | Сотрудники и роли |

| 🕒 **Смены** | 📱 **Доступ с устройств** | ✨ **AI Copilot** |
| :--- | :--- | :--- |
| Рабочие процессы | Веб, Android, Windows | Интеллектуальные инструменты |

## 04 / ВИЗУАЛЬНЫЙ ЯЗЫК САЙТА

- **Dark-first:** тёмная основа и контрастная типографика.
- **Blue × White:** синие и белые световые акценты.
- **Motion:** плавные появления, переходы и видеосцены.
- **Product-first:** акцент на настоящем интерфейсе приложения.
- **Responsive:** адаптация под мобильные и большие экраны.

## 05 / ТЕХНОЛОГИИ

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)

</div>

Сайт представляет собой статический веб-проект. Для локального просмотра достаточно HTTP-сервера.

```bash
git clone https://github.com/JustT1MExGOD/t2sales-site.git
cd t2sales-site
python3 -m http.server 8000
```

Откройте **http://localhost:8000**.

## 06 / ПУБЛИКАЦИЯ

Подходит статический хостинг: **GitHub Pages, Cloudflare Pages, Netlify, Vercel или nginx**. При публикации проверьте DNS, HTTPS, медиафайлы и форму обратной связи.

> Если форма использует `mailto:`, отправка зависит от почтового клиента посетителя. Для надёжного приёма заявок нужен серверный обработчик.

## 07 / РАЗВИТИЕ

- [ ] Оптимизировать загрузку видео и изображений.
- [ ] Улучшить SEO и доступность.
- [ ] Добавить надёжную серверную отправку заявок.
- [ ] Регулярно обновлять демонстрационные материалы.

---

<div align="center">

### T2 SALES

**BUILT FOR PERFORMANCE.**

[![Перейти на сайт](https://img.shields.io/badge/EXPERIENCE_T2_SALES-t2sales.ru-2176F5?style=for-the-badge)](https://t2sales.ru)

<sub>Презентационный сайт T2 Sales · <a href="https://github.com/JustT1MExGOD/tele2-app">Основной проект</a></sub>

</div>