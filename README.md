# POWERFULL - Fitness & Spor Merkezi Web Sitesi

**CANLI DEMO**: [https://spor-center-sozdar.netlify.app/](https://spor-center-sozdar.netlify.app)


POWERFULL, modern web teknolojileri kullanılarak tasarlanmış responsive bir fitness merkezi web sitesidir. Bu proje, interaktif özellikler, mobil-öncelikli tasarım ve optimize edilmiş performans ile profesyonel web geliştirme becerilerini sergiler.

## Proje Özeti

Bu fitness web sitesi projesi şunları içerir:
- **Responsive Tasarım**: 576px kırılma noktası ile mobil-öncelikli yaklaşım
- **Interaktif BMI Hesaplayıcı**: Gerçek zamanlı vücut kitle indeksi hesaplama
- **Dinamik Navigasyon**: Smooth scrolling ve sticky navbar işlevselliği
- **Eğitmen Profilleri**: Hover efektleri ile interaktif kartlar
- **Hizmet Seçimi**: Görsel geri bildirim ile aktif hizmet butonları
- **İletişim Formu**: Form doğrulama ve kullanıcı etkileşimi
- **Google Maps Entegrasyonu**: Gömülü konum haritası

## 🛠️ Kullanılan Teknolojiler

### Frontend Teknolojileri
- **HTML5**: Semantik markup ve erişilebilirlik özellikleri
- **CSS3**: Flexbox, Grid Layout ve CSS Variables ile modern styling
- **JavaScript (ES6+)**: Interaktif işlevsellik ve DOM manipülasyonu
- **Font Awesome 6.0**: Profesyonel ikon kütüphanesi
- **Google Fonts**: Poppins tipografi ailesi
- **Google Maps API**: Konum entegrasyonu

### Geliştirme Araçları
- **Netlify**: Deployment ve hosting platformu
- **Git**: Versiyon kontrol sistemi
- **VS Code**: Geliştirme ortamı

## 📁 Proje Yapısı

```
powerfull-fitness-website/
├── index.html              # Ana HTML dosyası
├── styles.css              # CSS stilleri ve responsive tasarım
├── script.js               # JavaScript işlevselliği
├── netlify.toml            # Netlify deployment konfigürasyonu
├── README.md               # Proje dokümantasyonu
└── Resimler/               # Görsel dosyaları klasörü
    ├── logo.png            # Web sitesi logosu
    ├── hero-man.jpg        # Hero bölümü arka plan görseli
    ├── trainer1.jpg        # Eğitmen profil görselleri
    ├── trainer2.jpg
    ├── trainer3.jpg
    ├── client1.jpg         # Müşteri yorumu görselleri
    ├── client2.jpg
    ├── group.webp          # Sınıf kategorisi görselleri
    ├── solo.jpg
    ├── yoga.jpg
    ├── stret.webp
    ├── bmi-index.jpg       # BMI hesaplayıcı bölümü görseli
    ├── purchase1.jpg       # Fiyatlandırma kartı görselleri
    ├── purchase2.jpg
    ├── purchase3.jpg
    └── purchase4.jpg
```



## 📱 Responsive Tasarım Özellikleri

Web sitesi 576px kırılma noktası ile mobil cihazlar için optimize edilmiştir:

- **Mobil Navigasyon**: Küçük ekranlar için hamburger menü
- **Esnek Grid Layout**: Mobilde tek sütun düzeni
- **Dokunma Dostu Arayüz**: Mobil etkileşim için büyük dokunma alanları
- **Optimize Edilmiş Görseller**: Daha hızlı yükleme için responsive görseller
- **Performans Optimizasyonu**: Tüm cihazlarda hızlı yükleme süreleri

## 🎯 Temel Özellikler ve Kod Örnekleri

### BMI Hesaplayıcı İşlevselliği - Gelişmiş Animasyonlu Versiyon
```javascript
// Gelişmiş BMI Calculator - Animasyonlu Sonuç Gösterimi
function displayAnimatedBMIResult(resultElement, bmiValue, category, categoryClass, description, height, weight, progressPercentage) {
    // Animasyonlu circular progress bar ile BMI değeri gösterimi
    resultElement.innerHTML = `
        <div class="bmi-visual-container">
            <div class="bmi-circular-progress">
                <svg class="progress-ring" width="120" height="120">
                    <circle class="progress-ring-background" cx="60" cy="60" r="50"></circle>
                    <circle class="progress-ring-progress ${categoryClass}" cx="60" cy="60" r="50" style="--progress: ${progressPercentage}"></circle>
                </svg>
                <div class="bmi-value-container">
                    <div class="bmi-value" data-target="${bmiValue}">0.0</div>
                    <div class="bmi-unit">BMI</div>
                </div>
            </div>
        </div>
        <div class="bmi-category-container">
            <div class="bmi-category ${categoryClass}">${category}</div>
            <div class="bmi-description">${description}</div>
        </div>
    `;

    // Sayma animasyonu ile BMI değerini göster
    animateValue(resultElement.querySelector('.bmi-value'), 0, bmiValue, 1500);
}
```

#### 🎨 Yeni BMI Calculator Özellikleri:
- **Animasyonlu Sayma**: BMI değeri 0'dan hedef değere kadar animasyonlu sayma
- **Circular Progress Bar**: SVG tabanlı dairesel ilerleme çubuğu
- **Kategori Bazlı Renkler**: Underweight (Mavi), Normal (Yeşil), Overweight (Turuncu), Obese (Kırmızı)
- **Smooth Animasyonlar**: Fade-in, slide-in ve pulse efektleri
- **Görsel BMI Aralıkları**: Renkli göstergeler ile BMI kategorileri
- **Responsive Tasarım**: Mobil cihazlarda optimize edilmiş görünüm
- **Inline Error Handling**: Alert yerine sayfa içi hata mesajları

### Smooth Scrolling Navigasyon
```javascript
// Değerlendirme formu 3 - Navigation Implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
```

### Arka Plan Değişimi ile Sticky Navbar
```javascript
// Değerlendirme formu 4 - Sticky Navbar Implementation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
```

### Interaktif Hizmet Seçimi
```javascript
// Değerlendirme formu 5 - Service Button Interaction
const serviceButtons = document.querySelectorAll('.service-btn');
serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Tüm butonlardan active class'ını kaldır
        serviceButtons.forEach(btn => btn.classList.remove('active'));
        // Tıklanan butona active class'ı ekle
        this.classList.add('active');
    });
});
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #355592 (Mavi)
- **Secondary**: #ff6b35 (Turuncu)
- **Accent**: #f7931e (Altın)
- **Text**: #333333 (Koyu Gri)
- **Background**: #f8f9fa (Açık Gri)

### Tipografi
- **Font Ailesi**: Poppins
- **Ağırlıklar**: 300, 400, 500, 600, 700
- **Temel Boyut**: 16px

### Önemli Özellikler:
- ✅ Responsive tasarım (576px breakpoint)
- ✅ **Gelişmiş Animasyonlu BMI hesaplayıcı** 🆕
  - Circular progress bar ile görsel gösterim
  - Animasyonlu sayma efekti
  - Kategori bazlı renkli göstergeler
  - Smooth fade-in/slide-in animasyonları
- ✅ Smooth scrolling navigasyon
- ✅ Sticky navbar
- ✅ İnteraktif hizmet seçimi
- ✅ Form validasyonu
- ✅ Google Maps entegrasyonu
- ✅ **Modern CSS3 Animasyonları** 🆕
  - Keyframe animasyonları
  - CSS transforms ve transitions
  - Hover efektleri ve micro-interactions

---

**POWERFULL** - Modern Fitness Deneyimi 💪
