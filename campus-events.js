(function () {
    const EVENTS_KEY = "campus-events.events.v1";
    const REGISTRATIONS_KEY = "campus-events.registrations.v1";
    const USER_KEY = "campus-events.user.v1";

    const starterEvents = [
        {
            id: "event-diwali-2026",
            name: "Diwali on the Green",
            category: "Cultural",
            date: "2026-11-02",
            time: "17:00",
            venue: "Central Lawn",
            description: "An evening of live music, rangoli, food stalls and a campus-wide festival of lights.",
            image: "cultural.jpg",
            capacity: 450
        },
        {
            id: "event-codefest-2026",
            name: "CodeFest: Build the Future",
            category: "Technical",
            date: "2026-11-15",
            time: "10:00",
            venue: "Innovation Lab",
            description: "Bring a team, solve a real-world challenge and demo what you create.",
            image: "coding.jpg",
            capacity: 120
        },
        {
            id: "event-sports-2026",
            name: "Intercollege Sports Day",
            category: "Sports",
            date: "2026-11-21",
            time: "09:00",
            venue: "Athletics Ground",
            description: "A full day of track events, team games and friendly campus rivalry.",
            image: "sports.jpg",
            capacity: 300
        },
        {
            id: "event-design-2026",
            name: "Make It Matter Workshop",
            category: "Workshop",
            date: "2026-12-05",
            time: "11:00",
            venue: "Studio 2, Arts Block",
            description: "A hands-on creative session exploring design, storytelling and ideas that travel.",
            image: "workshop.jpg",
            capacity: 60
        }
    ];

    function readList(key, fallback) {
        try {
            const stored = localStorage.getItem(key);
            if (stored === null) {
                localStorage.setItem(key, JSON.stringify(fallback));
                return fallback.slice();
            }
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : fallback.slice();
        } catch (error) {
            return fallback.slice();
        }
    }

    function writeList(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new CustomEvent("campus-events-change", {
            detail: { key: key }
        }));
    }

    function notifyChange(key) {
        window.dispatchEvent(new CustomEvent("campus-events-change", {
            detail: { key: key }
        }));
    }

    window.addEventListener("storage", function (event) {
        if (event.key === EVENTS_KEY || event.key === REGISTRATIONS_KEY) {
            notifyChange(event.key);
        }
    });

    window.CampusEvents = {
        eventKey: EVENTS_KEY,
        registrationKey: REGISTRATIONS_KEY,
        getEvents: function () {
            return readList(EVENTS_KEY, starterEvents);
        },
        saveEvents: function (events) {
            writeList(EVENTS_KEY, events);
        },
        getRegistrations: function () {
            return readList(REGISTRATIONS_KEY, []);
        },
        saveRegistrations: function (registrations) {
            writeList(REGISTRATIONS_KEY, registrations);
        },
        getUser: function () {
            try {
                return JSON.parse(sessionStorage.getItem(USER_KEY) || "null");
            } catch (error) {
                return null;
            }
        },
        setUser: function (user) {
            sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        },
        clearUser: function () {
            sessionStorage.removeItem(USER_KEY);
        }
    };
})();