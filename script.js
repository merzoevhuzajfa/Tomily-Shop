// App State
let currentScreen = 'homeScreen';
let currentCategory = null;
let cart = [];
let favorites = [];
let currentUser = null;

// Sample Data
const products = {
    clothing: [
        {
            id: 'c1',
            name: 'Элегантное платье',
            price: 8900,
            oldPrice: 12000,
            category: 'clothing',
            image: '👗',
            description: 'Стильное платье для особых случаев. Изготовлено из качественного материала с красивым кроем.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['Черный', 'Синий', 'Красный']
        },
        {
            id: 'c2',
            name: 'Блузка классическая',
            price: 3200,
            oldPrice: 4500,
            category: 'clothing',
            image: '👚',
            description: 'Универсальная блузка для офиса и повседневной носки. Хорошо сочетается с юбками и брюками.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['Белый', 'Голубой', 'Розовый']
        },
        {
            id: 'c3',
            name: 'Юбка-карандаш',
            price: 4500,
            oldPrice: 6000,
            category: 'clothing',
            image: '👗',
            description: 'Строгая юбка-карандаш для делового стиля. Идеально подходит для офиса.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['Черный', 'Серый', 'Синий']
        }
    ],
    shoes: [
        {
            id: 's1',
            name: 'Туфли на каблуке',
            price: 6500,
            oldPrice: 8500,
            category: 'shoes',
            image: '👠',
            description: 'Элегантные туфли на каблуке для особых случаев. Удобная колодка и качественные материалы.',
            sizes: ['35', '36', '37', '38', '39', '40'],
            colors: ['Черный', 'Красный', 'Белый']
        },
        {
            id: 's2',
            name: 'Сапоги зимние',
            price: 8900,
            oldPrice: 12000,
            category: 'shoes',
            image: '👢',
            description: 'Теплые зимние сапоги с меховой подкладкой. Отлично защищают от холода и влаги.',
            sizes: ['35', '36', '37', '38', '39', '40'],
            colors: ['Черный', 'Коричневый', 'Серый']
        },
        {
            id: 's3',
            name: 'Кроссовки спортивные',
            price: 4200,
            oldPrice: 5500,
            category: 'shoes',
            image: '👟',
            description: 'Удобные спортивные кроссовки для активного образа жизни. Легкие и дышащие.',
            sizes: ['35', '36', '37', '38', '39', '40'],
            colors: ['Белый', 'Черный', 'Розовый']
        }
    ],
    accessories: [
        {
            id: 'a1',
            name: 'Сумка кожаная',
            price: 7800,
            oldPrice: 9500,
            category: 'accessories',
            image: '👜',
            description: 'Стильная кожаная сумка для повседневного использования. Вместительная и практичная.',
            sizes: ['Один размер'],
            colors: ['Коричневый', 'Черный', 'Бежевый']
        },
        {
            id: 'a2',
            name: 'Колье золотое',
            price: 12000,
            oldPrice: 15000,
            category: 'accessories',
            image: '💍',
            description: 'Элегантное золотое колье с драгоценными камнями. Идеально для особых случаев.',
            sizes: ['Один размер'],
            colors: ['Золотой']
        },
        {
            id: 'a3',
            name: 'Ремень кожаный',
            price: 2800,
            oldPrice: 3500,
            category: 'accessories',
            image: '👔',
            description: 'Качественный кожаный ремень с красивой пряжкой. Подходит для любого стиля.',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Коричневый', 'Черный']
        }
    ],
    cosmetics: [
        {
            id: 'cos1',
            name: 'Набор для макияжа',
            price: 4500,
            oldPrice: 6000,
            category: 'cosmetics',
            image: '💄',
            description: 'Профессиональный набор для макияжа. Включает все необходимое для создания красивого образа.',
            sizes: ['Один размер'],
            colors: ['Разноцветный']
        },
        {
            id: 'cos2',
            name: 'Крем для лица',
            price: 2800,
            oldPrice: 3500,
            category: 'cosmetics',
            image: '🧴',
            description: 'Увлажняющий крем для лица с натуральными компонентами. Подходит для всех типов кожи.',
            sizes: ['50мл', '100мл'],
            colors: ['Белый']
        },
        {
            id: 'cos3',
            name: 'Тушь для ресниц',
            price: 1200,
            oldPrice: 1800,
            category: 'cosmetics',
            image: '🎨',
            description: 'Объемная тушь для ресниц. Не осыпается и держится весь день.',
            sizes: ['Один размер'],
            colors: ['Черный', 'Коричневый']
        }
    ]
};

// Navigation Functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate corresponding nav item
    const navItem = document.querySelector(`[onclick="showScreen('${screenId}')"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    currentScreen = screenId;
    
    // Load content based on screen
    switch(screenId) {
        case 'homeScreen':
            loadFeaturedProducts();
            break;
        case 'categoryScreen':
            if (currentCategory) {
                loadCategoryProducts(currentCategory);
            }
            break;
        case 'cartScreen':
            loadCart();
            break;
        case 'profileScreen':
            loadProfile();
            break;
    }
}

function goBack() {
    switch(currentScreen) {
        case 'categoryScreen':
            showScreen('homeScreen');
            break;
        case 'productDetailScreen':
            if (currentCategory) {
                showScreen('categoryScreen');
            } else {
                showScreen('homeScreen');
            }
            break;
        case 'cartScreen':
        case 'profileScreen':
            showScreen('homeScreen');
            break;
    }
}

// Search Functions
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query.trim()) return;
    
    // Search in all products
    const allProducts = Object.values(products).flat();
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    // Show search results in category screen
    currentCategory = 'search';
    document.getElementById('categoryTitle').textContent = `Поиск: ${query}`;
    showScreen('categoryScreen');
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('categoryProducts');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить запрос</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map(product => createProductCard(product)).join('');
}

// Category Functions
function showCategory(category) {
    currentCategory = category;
    const categoryNames = {
        clothing: 'Одежда',
        shoes: 'Обувь',
        accessories: 'Аксессуары',
        cosmetics: 'Косметика'
    };
    
    document.getElementById('categoryTitle').textContent = categoryNames[category];
    showScreen('categoryScreen');
    loadCategoryProducts(category);
}

function loadCategoryProducts(category) {
    const container = document.getElementById('categoryProducts');
    const categoryProducts = products[category] || [];
    
    if (categoryProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>Товары не найдены</h3>
                <p>В данной категории пока нет товаров</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    
    return `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">
                    ${product.price.toLocaleString()} ₽
                    ${product.oldPrice ? `<span class="product-old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}
                </div>
                ${discount > 0 ? `<div style="color: #e74c3c; font-size: 0.8rem; font-weight: 600;">-${discount}%</div>` : ''}
            </div>
        </div>
    `;
}

// Product Detail Functions
function showProductDetail(productId) {
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;
    
    const container = document.getElementById('productDetail');
    container.innerHTML = `
        <div class="product-detail-image">
            ${product.image}
        </div>
        <div class="product-detail-info">
            <h2 class="product-detail-title">${product.name}</h2>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-price">
                ${product.price.toLocaleString()} ₽
                ${product.oldPrice ? `<span style="text-decoration: line-through; color: #95a5a6; font-size: 1.2rem; margin-left: 0.5rem;">${product.oldPrice.toLocaleString()} ₽</span>` : ''}
            </div>
            <div class="product-detail-actions">
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                    <i class="fas fa-shopping-cart"></i>
                    Добавить в корзину
                </button>
                <button class="favorite-btn" onclick="toggleFavorite('${product.id}')">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    showScreen('productDetailScreen');
}

// Cart Functions
function addToCart(productId) {
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Товар добавлен в корзину');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    loadCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            loadCart();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function loadCart() {
    const container = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары для покупки</p>
            </div>
        `;
        document.getElementById('totalPrice').textContent = '0 ₽';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.image}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₽</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart('${item.id}')" style="background: #ff4757; color: white;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalPrice').textContent = `${total.toLocaleString()} ₽`;
}

function showCart() {
    showScreen('cartScreen');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста');
        return;
    }
    
    if (!currentUser) {
        showNotification('Войдите в аккаунт для оформления заказа');
        login();
        return;
    }
    
    showNotification('Заказ оформлен! Спасибо за покупку!');
    cart = [];
    updateCartCount();
    loadCart();
    showScreen('homeScreen');
}

// Profile Functions
function showProfile() {
    showScreen('profileScreen');
}

function loadProfile() {
    // Profile content is already in HTML
}

function login() {
    document.getElementById('loginModal').classList.add('active');
}

function register() {
    document.getElementById('registerModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function performLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Заполните все поля');
        return;
    }
    
    // Simulate login
    currentUser = { name: 'Пользователь', email: email };
    closeModal('loginModal');
    showNotification('Вы успешно вошли в аккаунт');
    loadProfile();
}

function performRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!name || !email || !password) {
        showNotification('Заполните все поля');
        return;
    }
    
    // Simulate registration
    currentUser = { name: name, email: email };
    closeModal('registerModal');
    showNotification('Регистрация прошла успешно');
    loadProfile();
}

// Favorites Functions
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Убрано из избранного');
    } else {
        favorites.push(productId);
        showNotification('Добавлено в избранное');
    }
}

function showFavorites() {
    const allProducts = Object.values(products).flat();
    const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));
    
    if (favoriteProducts.length === 0) {
        showNotification('У вас нет избранных товаров');
        return;
    }
    
    currentCategory = 'favorites';
    document.getElementById('categoryTitle').textContent = 'Избранное';
    showScreen('categoryScreen');
    
    const container = document.getElementById('categoryProducts');
    container.innerHTML = favoriteProducts.map(product => createProductCard(product)).join('');
}

// Utility Functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Featured Products Functions
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    
    // Get random products from all categories
    const allProducts = Object.values(products).flat();
    const featured = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
    
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Filter Functions
document.addEventListener('DOMContentLoaded', function() {
    // Add filter functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Apply filter
            const filter = e.target.dataset.filter;
            applyFilter(filter);
        }
    });
});

function applyFilter(filter) {
    if (!currentCategory || currentCategory === 'search' || currentCategory === 'favorites') return;
    
    let filteredProducts = products[currentCategory] || [];
    
    switch(filter) {
        case 'new':
            filteredProducts = filteredProducts.slice(0, 3); // Show first 3 as "new"
            break;
        case 'sale':
            filteredProducts = filteredProducts.filter(p => p.oldPrice);
            break;
        case 'popular':
            filteredProducts = filteredProducts.slice(0, 4); // Show first 4 as "popular"
            break;
        default:
            // Show all products
            break;
    }
    
    const container = document.getElementById('categoryProducts');
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-filter"></i>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить фильтр</p>
            </div>
        `;
    } else {
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content
    loadFeaturedProducts();
    updateCartCount();
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Handle search input enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Additional utility functions
function showCategories() {
    showScreen('categoryScreen');
    currentCategory = 'clothing';
    document.getElementById('categoryTitle').textContent = 'Одежда';
    loadCategoryProducts('clothing');
}

function showOrders() {
    showNotification('Функция "Мои заказы" в разработке');
}

function showSettings() {
    showNotification('Функция "Настройки" в разработке');
}

// Export functions for global access
window.showScreen = showScreen;
window.goBack = goBack;
window.toggleSearch = toggleSearch;
window.performSearch = performSearch;
window.showCategory = showCategory;
window.showProductDetail = showProductDetail;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.showCart = showCart;
window.checkout = checkout;
window.showProfile = showProfile;
window.login = login;
window.register = register;
window.closeModal = closeModal;
window.performLogin = performLogin;
window.performRegister = performRegister;
window.toggleFavorite = toggleFavorite;
window.showFavorites = showFavorites;
window.showCategories = showCategories;
window.showOrders = showOrders;
window.showSettings = showSettings;
