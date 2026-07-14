// Sticky Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = hamburger.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            // If scrolled, we need bars dark; if at top, bars white. 
            // In mobile active state with white background, make them dark.
            bars.forEach(b => b.style.backgroundColor = 'var(--primary)');
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            if (window.scrollY <= 50) {
                bars.forEach(b => b.style.backgroundColor = 'var(--white)');
            }
        }
    });
}

// Close mobile menu on link click (excluding dropdown trigger)
document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            if (window.scrollY <= 50) {
                bars.forEach(b => b.style.backgroundColor = 'var(--white)');
            }
        }
    });
});

// Accordion toggle for dropdowns in mobile view
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent immediate navigation
            const parentDropdown = this.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parentDropdown) {
                        d.classList.remove('active');
                    }
                });
            }
        }
    });
});

// Scroll Animations using Intersection Observer
const fadeUpElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

fadeUpElements.forEach(element => {
    observer.observe(element);
});

// Ensure the hero animation plays on load and load dynamic content
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize and Load data from localStorage
    initDynamicData();

    // 2. Play animations
    const heroElements = document.querySelectorAll('.hero .fade-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 150);
    });
});

// Dynamic content data structure and initialization
const defaultData = {
    logo: {
        textFirst: "Noori",
        textSecond: "Transportation Co.",
        image: "" // Base64 or URL
    },
    hero: {
        label: "NOORI TRANSPORTATION CO.",
        heading: "Powering Industries Through Reliable Logistics.",
        subheading: "Integrated mining, transportation, and industrial logistics solutions delivering operational excellence, safety, and reliability across multiple industries.",
        bgImage: "https://loremflickr.com/1600/900/semi,truck,highway?lock=10"
    },
    about: {
        heading: "About Noori Transportation Co.",
        text: "Noori Transport Co. is a leading provider of integrated mining, transportation, and energy logistics solutions, serving industries with reliability, efficiency, and uncompromising safety standards. With expertise spanning multiple sectors, we deliver end-to-end solutions that support the movement of essential resources and industrial commodities.\n\nOur operations include coal mining, coal transportation, bulk cargo logistics, hazardous materials transportation, industrial waste transportation, fuel logistics, and hydrogen & clean energy logistics...",
        img1: "https://loremflickr.com/600/400/coal,mine?lock=11",
        img2: "https://loremflickr.com/600/400/freight,truck?lock=12",
        img3: "https://loremflickr.com/600/400/industrial,warehouse?lock=13"
    },
    services: [
        { id: "serv-1", icon: "fa-solid fa-mountain", title: "Mining Logistics", desc: "End-to-end extraction support, heavy earthmoving equipment deployment, and safe mineral transport logistics from mine pit to processing hubs.", image: "https://loremflickr.com/800/600/excavator,mine?lock=1" },
        { id: "serv-2", icon: "fa-solid fa-truck-moving", title: "Coal Transportation", desc: "High-volume, compliant coal transit via heavy-duty tippers and bulk carriers from mines to thermal power plants and steel mills.", image: "https://loremflickr.com/800/600/coal,truck?lock=2" },
        { id: "serv-3", icon: "fa-solid fa-boxes-stacked", title: "Bulk Cargo Logistics", desc: "Comprehensive supply chain handling for non-hazardous industrial bulk goods, raw materials, and mineral processing logistics.", image: "https://loremflickr.com/800/600/freight,shipping?lock=3" },
        { id: "serv-4", icon: "fa-solid fa-skull-crossbones", title: "Hazardous Material Transport", desc: "Strictly certified and regulated transit of sensitive chemical raw materials, hazardous liquids, and specialized industrial gasses.", image: "https://loremflickr.com/800/600/chemical,tanker?lock=4" },
        { id: "serv-5", icon: "fa-solid fa-dumpster", title: "Industrial Waste Transportation", desc: "Compliant and safe transit of chemical byproducts, toxic manufacturing residue, and heavy industrial waste to treatment sites.", image: "https://loremflickr.com/800/600/garbage,truck?lock=5" },
        { id: "serv-6", icon: "fa-solid fa-gas-pump", title: "Fuel Logistics", desc: "High-safety transport of petroleum products, diesel supplies, and industrial liquid fuels utilizing specialized tankers.", image: "https://loremflickr.com/800/600/fuel,tanker?lock=6" },
        { id: "serv-7", icon: "fa-solid fa-leaf", title: "Hydrogen & Clean Energy Logistics", desc: "Innovative transit solutions for compressed hydrogen gas, liquefied clean fuels, and renewable energy infrastructure equipment.", image: "https://loremflickr.com/800/600/eco,truck?lock=7" },
        { id: "serv-8", icon: "fa-solid fa-route", title: "Supply Chain Solutions", desc: "Integrated logistics optimization, route planning, warehousing coordination, and multi-modal freight forwarding networks.", image: "https://loremflickr.com/800/600/warehouse,forklift?lock=8" },
        { id: "serv-9", icon: "fa-solid fa-gears", title: "Customized Logistics Services", desc: "Tailored commercial contracts, emergency freight allocations, and project-specific heavy-haul transport tasks.", image: "https://loremflickr.com/800/600/heavy,machine?lock=9" }
    ],
    industries: [
        { id: "ind-1", icon: "fa-solid fa-gem", name: "Mining" },
        { id: "ind-2", icon: "fa-solid fa-flask", name: "Chemical Industry" },
        { id: "ind-3", icon: "fa-solid fa-seedling", name: "Fertilizer Industry" },
        { id: "ind-4", icon: "fa-solid fa-industry", name: "Manufacturing" },
        { id: "ind-5", icon: "fa-solid fa-bridge", name: "Infrastructure" },
        { id: "ind-6", icon: "fa-solid fa-bolt", name: "Power Plants" },
        { id: "ind-7", icon: "fa-solid fa-oil-well", name: "Oil & Gas" },
        { id: "ind-8", icon: "fa-solid fa-recycle", name: "Waste Management" },
        { id: "ind-9", icon: "fa-solid fa-solar-panel", name: "Energy Sector" }
    ],
    leadership: [
        {
            id: "leader-1",
            name: "Ibrahim Saya",
            designation: "Founder / Managing Director",
            bio: "Leading the organization with a vision built on integrity, operational excellence, and long-term growth.",
            image: "https://loremflickr.com/400/400/professional,portrait,man"
        },
        {
            id: "leader-2",
            name: "Coming Soon",
            designation: "Director",
            bio: "Leadership profile will be updated soon.",
            image: ""
        },
        {
            id: "leader-3",
            name: "Coming Soon",
            designation: "Director",
            bio: "Leadership profile will be updated soon.",
            image: ""
        }
    ],
    clients: [
        { name: "Client Logo 1", logo: "" },
        { name: "Client Logo 2", logo: "" },
        { name: "Client Logo 3", logo: "" },
        { name: "Client Logo 4", logo: "" },
        { name: "Client Logo 5", logo: "" }
    ]
};

function initDynamicData() {
    let data = localStorage.getItem('noori_website_data');
    if (!data) {
        localStorage.setItem('noori_website_data', JSON.stringify(defaultData));
        data = JSON.stringify(defaultData);
    }
    let websiteData = JSON.parse(data);
    
    // Auto-migrate schema changes or updates in services count
    let needsUpdate = false;
    if (!websiteData.services || websiteData.services.length !== defaultData.services.length) {
        websiteData.services = defaultData.services;
        needsUpdate = true;
    }
    if (!websiteData.industries) {
        websiteData.industries = defaultData.industries;
        needsUpdate = true;
    }
    if (needsUpdate) {
        localStorage.setItem('noori_website_data', JSON.stringify(websiteData));
    }
    
    applyWebsiteData(websiteData);
}

function applyWebsiteData(data) {
    // 1. Logo (Supports either text or base64/URL image)
    const logoEl = document.getElementById('siteLogo');
    if (logoEl && data.logo) {
        if (data.logo.image) {
            logoEl.innerHTML = `<img src="${data.logo.image}" alt="Logo" class="site-logo-img">`;
        } else {
            logoEl.innerHTML = `${data.logo.textFirst} <span>${data.logo.textSecond}</span>`;
        }
    }

    // 2. Hero
    const heroBgImage = document.getElementById('heroBgImage');
    if (heroBgImage && data.hero.bgImage) {
        heroBgImage.src = data.hero.bgImage;
    }
    const heroLabel = document.getElementById('heroLabel');
    if (heroLabel && data.hero.label) {
        heroLabel.textContent = data.hero.label;
    }
    const heroHeading = document.getElementById('heroHeading');
    if (heroHeading && data.hero.heading) {
        heroHeading.textContent = data.hero.heading;
    }
    const heroSubheading = document.getElementById('heroSubheading');
    if (heroSubheading && data.hero.subheading) {
        heroSubheading.textContent = data.hero.subheading;
    }

    // 3. About
    const aboutHeading = document.getElementById('aboutHeading');
    if (aboutHeading && data.about.heading) {
        aboutHeading.textContent = data.about.heading;
    }
    const aboutParagraphs = document.getElementById('aboutParagraphs');
    if (aboutParagraphs && data.about.text) {
        const paragraphs = data.about.text.split('\n\n');
        aboutParagraphs.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    }
    const aboutImg1 = document.getElementById('aboutImg1');
    if (aboutImg1 && data.about.img1) {
        aboutImg1.src = data.about.img1;
    }
    const aboutImg2 = document.getElementById('aboutImg2');
    if (aboutImg2 && data.about.img2) {
        aboutImg2.src = data.about.img2;
    }
    const aboutImg3 = document.getElementById('aboutImg3');
    if (aboutImg3 && data.about.img3) {
        aboutImg3.src = data.about.img3;
    }

    // 4. Services
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid && data.services) {
        // Filter out 'Customized Logistics Services' from homepage grid
        const homepageServices = data.services.filter(s => s.title !== "Customized Logistics Services");

        servicesGrid.innerHTML = homepageServices.map((service, index) => {
            const delay = index % 3 === 0 ? '' : index % 3 === 1 ? 'delay-1' : 'delay-2';
            const iconHtml = service.image
                ? `<img src="${service.image}" alt="">`
                : `<i class="${service.icon || 'fa-solid fa-truck'}"></i>`;
            return `
                <div class="service-card fade-up ${delay} visible">
                    <div class="service-icon">${iconHtml}</div>
                    <h3>${service.title}</h3>
                    <p>${service.desc}</p>
                    <a href="services.html#${service.id}" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
        }).join('');
    }

    // Populate Services Dropdown Menu in navbar
    const servicesDropdownMenu = document.getElementById('servicesDropdownMenu');
    if (servicesDropdownMenu && data.services) {
        servicesDropdownMenu.innerHTML = data.services.map(serv => {
            return `<a href="services.html#${serv.id}">${serv.title}</a>`;
        }).join('');
    }

    // 5. Industries We Serve
    const industriesGrid = document.getElementById('industriesGrid');
    if (industriesGrid && data.industries) {
        industriesGrid.innerHTML = data.industries.map(ind => {
            const iconHtml = ind.image
                ? `<img src="${ind.image}" alt="" style="height: 24px; width: auto; object-fit: contain; vertical-align: middle; margin-right: 8px;">`
                : `<i class="${ind.icon || 'fa-solid fa-industry'}" style="margin-right: 8px;"></i>`;
            return `
                <div class="industry-item fade-up visible" style="display: inline-flex; align-items: center; justify-content: center;">
                    ${iconHtml} ${ind.name}
                </div>
            `;
        }).join('');
    }

    // 6. Leadership
    const leadershipGrid = document.getElementById('leadershipGrid');
    if (leadershipGrid && data.leadership) {
        leadershipGrid.innerHTML = data.leadership.map((leader, index) => {
            const delayClass = index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : '';
            const imageHtml = leader.image 
                ? `<img src="${leader.image}" alt="${leader.name}">`
                : `<i class="fa-solid fa-user-tie"></i>`;
            const placeholderClass = leader.image ? '' : ' placeholder';

            return `
                <div class="profile-card fade-up ${delayClass} visible">
                    <div class="profile-image${placeholderClass}">
                        ${imageHtml}
                    </div>
                    <h3>${leader.name}</h3>
                    <p class="designation">${leader.designation}</p>
                    <p class="bio-short">${leader.bio}</p>
                    ${leader.image ? `<a href="leadership.html" class="btn btn-outline btn-sm">Know More</a>` : ''}
                </div>
            `;
        }).join('');
    }

    // 7. Clients
    const clientLogosContainer = document.getElementById('clientLogosContainer');
    if (clientLogosContainer && data.clients) {
        clientLogosContainer.innerHTML = data.clients.map(client => {
            const hasLogo = client.logo && client.logo.trim() !== '';
            return `
                <div class="logo-box">
                    ${hasLogo ? `<img src="${client.logo}" alt="${client.name}">` : ''}
                    <span>${client.name}</span>
                </div>
            `;
        }).join('');

        // Start animating if clients > 5
        initClientsCarousel(data.clients.length);
    }
}

// Client Carousel Animation (Seamless Infinite Loop)
function initClientsCarousel(clientCount) {
    const track = document.getElementById('clientLogosContainer');
    const wrapper = document.querySelector('.client-logos-wrapper');
    if (!track || !wrapper || clientCount <= 5) {
        if (track) track.style.transform = 'translateX(0)';
        return;
    }

    // Cancel any existing animation frame to prevent doubling speeds
    if (window.clientCarouselAnimationId) {
        cancelAnimationFrame(window.clientCarouselAnimationId);
    }

    // Setup wrapper and track styling
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '100%';
    wrapper.style.position = 'relative';

    track.style.display = 'flex';
    track.style.flexWrap = 'nowrap';
    track.style.width = 'max-content';
    track.style.transition = 'none';

    // Clone all items and append them to create a continuous track
    const originalChildren = Array.from(track.children);
    track.innerHTML = '';
    originalChildren.forEach(child => track.appendChild(child));
    
    // Compute exact original width of the track (sum of children widths + gaps)
    let originalWidth = 0;
    const gap = 32; // 2rem gap is 32px
    originalChildren.forEach(child => {
        originalWidth += child.getBoundingClientRect().width + gap;
    });

    // Clone items to fill space and enable loop wrapping
    originalChildren.forEach(child => {
        const clone = child.cloneNode(true);
        track.appendChild(clone);
    });

    let currentX = 0;
    const speed = 0.8; // Smooth slow scroll

    function step() {
        currentX -= speed;
        // When the original set has scrolled fully off-screen, reset back to 0
        if (Math.abs(currentX) >= originalWidth) {
            currentX = 0;
        }
        track.style.transform = `translateX(${currentX}px)`;
        window.clientCarouselAnimationId = requestAnimationFrame(step);
    }

    // Delay measurement until DOM finishes layout flow
    setTimeout(() => {
        window.clientCarouselAnimationId = requestAnimationFrame(step);
    }, 150);
}


