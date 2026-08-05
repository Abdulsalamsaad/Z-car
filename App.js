import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  Alert
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// ==========================================
// SUPABASE CLIENT INITIALIZATION
// ==========================================
const SUPABASE_URL = 'https://mrbtebpqtfxjznvvqzob.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IO6WjP0JP3eX_JdtPETayg_vtXgg7z9';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { width } = Dimensions.get('window');

// ==========================================
// 1. DICTIONARY & MULTI-LANGUAGE (5 LANGUAGES)
// ==========================================
const translations = {
  ar: {
    appName: "وصلة",
    tagline: "منصة تنقل الموظفين في دبي",
    loginTitle: "مرحباً بك مجدداً",
    loginSub: "تسجيل الدخول لإدارة رحلاتك اليومية",
    phonePlaceholder: "رقم الهاتف (05xxxxxxxx)",
    passPlaceholder: "كلمة المرور",
    loginBtn: "تسجيل الدخول / تسجيل جديد",
    planTitle: "خطط لأسبوعك",
    planSub: "اختر أيام التنقل والمواقف والمواعيد",
    activeDays: "أيام العمل النشطة",
    routeLabel: "المسار المفضّل",
    busTypeLabel: "سعة ونوع الحافلة",
    timeLabel: "توقيت الانطلاق",
    subLabel: "باقة الاشتراك",
    weeklyPass: "اشتراك أسبوعي",
    monthlyPass: "اشتراك شهري",
    tabbyOption: "قسّمها على 4 دفعات مع Tabby (0% فائدة)",
    confirmPlanBtn: "تأكيد الباقة والتكلفة",
    seatTitle: "اختيار المقعد",
    seatSub: "اختر مكانك المفضّل داخل الحافلة",
    front: "المقدمة (السائق)",
    confirmSeat: "تأكيد المقعد والمتابعة",
    ticketTitle: "تذكرة الصعود",
    ticketSub: "امسح رمز QR عند الصعود للحافلة",
    seatNum: "المقعد الرقم:",
    depTime: "الوقت:",
    route: "المسار:",
    trackBusBtn: "تتبع الحافلة مباشرة",
    trackerTitle: "التتبع الحي للحافلة",
    trackerSub: "حافلة DXB-A-45821 · متجهة لنقطة النزول",
    eta: "الوقت المتوقع للوصول",
    minutes: "دقائق",
    backToHome: "العودة للرئيسية",
    backBtn: "رجوع",
    proceedToPayment: "تأكيد الحجز والدفع المباشر",
    selectSeatsFirst: "يرجى اختيار مقعد",
    currPrice: "الإجمالي: "
  },
  en: {
    appName: "Wasla",
    tagline: "Dubai Commuter Transit Platform",
    loginTitle: "Welcome Back",
    loginSub: "Log in to manage your daily commutes",
    phonePlaceholder: "Phone Number (05xxxxxxxx)",
    passPlaceholder: "Password",
    loginBtn: "Log In / Register",
    planTitle: "Plan Your Week",
    planSub: "Select active workdays, stops and schedule",
    activeDays: "Active Workdays",
    routeLabel: "Preferred Route",
    busTypeLabel: "Bus Capacity & Type",
    timeLabel: "Departure Time",
    subLabel: "Subscription Plan",
    weeklyPass: "Weekly Pass",
    monthlyPass: "Monthly Pass",
    tabbyOption: "Split in 4 payments with Tabby (0% interest)",
    confirmPlanBtn: "Confirm Plan & Proceed",
    seatTitle: "Select Seat",
    seatSub: "Choose your preferred seat on the bus",
    front: "Front (Driver)",
    confirmSeat: "Confirm Seat & Proceed",
    ticketTitle: "Boarding Pass",
    ticketSub: "Scan QR code upon boarding",
    seatNum: "Seat Number:",
    depTime: "Departure:",
    route: "Route:",
    trackBusBtn: "Live Track Bus",
    trackerTitle: "Live Fleet Tracker",
    trackerSub: "Bus DXB-A-45821 · En route to drop-off",
    eta: "Estimated Arrival",
    minutes: "mins",
    backToHome: "Back to Home",
    backBtn: "Back",
    proceedToPayment: "Confirm Booking & Pay Now",
    selectSeatsFirst: "Please select a seat",
    currPrice: "Total: "
  },
  ur: {
    appName: "وصلہ",
    tagline: "دبئی کمیوٹر ٹرانزٹ پلیٹ فارم",
    loginTitle: "خوش آمدید",
    loginSub: "اپنے روزمرہ کے سفر کا نظم کرنے کے لیے لاگ ان کریں",
    phonePlaceholder: "فون نمبر (05xxxxxxxx)",
    passPlaceholder: "پاس ورڈ",
    loginBtn: "لاگ ان کریں / رجسٹر ہوں",
    planTitle: "اپنے ہفتے کی منصوبہ بندی کریں",
    planSub: "کام کے دن اور اوقات منتخب کریں",
    activeDays: "فعال کام کے دن",
    routeLabel: "ترجیحی راستہ",
    busTypeLabel: "بس کی گنجائش اور قسم",
    timeLabel: "روانگی کا وقت",
    subLabel: "سبسکرپشن پلان",
    weeklyPass: "ہفتہ وار پاس",
    monthlyPass: "ماہانہ پاس",
    tabbyOption: "ٹیبی کے ساتھ 4 اقساط میں تقسیم کریں",
    confirmPlanBtn: "منصوبے کی تصدیق کریں",
    seatTitle: "سیٹ منتخب کریں",
    seatSub: "بس میں اپنی پسندیدہ سیٹ منتخب کریں",
    front: "فرنٹ (ڈرائیور)",
    confirmSeat: "سیٹ کی تصدیق کریں",
    ticketTitle: "بورڈنگ پاس",
    ticketSub: "سوار ہوتے وقت QR کوڈ اسکین کریں",
    seatNum: "سیٹ نمبر:",
    depTime: "روانگی:",
    route: "راستہ:",
    trackBusBtn: "بس کو لائیو ٹریک کریں",
    trackerTitle: "لائیو بس ٹریکر",
    trackerSub: "بس DXB-A-45821 · منزل کی طرف گامزن",
    eta: "متوقع آمد",
    minutes: "منٹ",
    backToHome: "ہوم پر واپس جائیں",
    backBtn: "واپس",
    proceedToPayment: "ادائیگی اور بکنگ مکمل کریں",
    selectSeatsFirst: "براہ کرم ایک سیٹ منتخب کریں",
    currPrice: "کل: "
  },
  hi: {
    appName: "वसला",
    tagline: "दुबई कम्यूटर ट्रांजिट प्लेटफॉर्म",
    loginTitle: "पुनः आपका स्वागत है",
    loginSub: "अपनी दैनिक यात्राओं को प्रबंधित करने के लिए लॉगिन करें",
    phonePlaceholder: "फोन नंबर (05xxxxxxxx)",
    passPlaceholder: "पासवर्ड",
    loginBtn: "लॉगिन करें / रजिस्टर करें",
    planTitle: "अपने सप्ताह की योजना बनाएं",
    planSub: "सक्रिय कार्य दिवसों और समय का चयन करें",
    activeDays: "सक्रिय कार्य दिवस",
    routeLabel: "पसंदीदा मार्ग",
    busTypeLabel: "बस क्षमता और प्रकार",
    timeLabel: "प्रस्थान का समय",
    subLabel: "सदस्यता योजना",
    weeklyPass: "साप्ताहिक पास",
    monthlyPass: "मासिक पास",
    tabbyOption: "Tabby के साथ 4 किश्तों में भुगतान करें",
    confirmPlanBtn: "योजना की पुष्टि करें",
    seatTitle: "सीट चुनें",
    seatSub: "बस में अपनी पसंदीदा सीट चुनें",
    front: "आगे (ड्राइवर)",
    confirmSeat: "सीट की पुष्टि करें",
    ticketTitle: "बोर्डिंग पास",
    ticketSub: "बस में चढ़ते समय QR कोड स्कैन करें",
    seatNum: "सीट संख्या:",
    depTime: "प्रस्थान:",
    route: "मार्ग:",
    trackBusBtn: "बस को लाइव ट्रैक करें",
    trackerTitle: "लाइव बस ट्रैकर",
    trackerSub: "बस DXB-A-45821 · गंतव्य की ओर",
    eta: "अनुमानित आगमन",
    minutes: "मिनट",
    backToHome: "होम पर वापस जाएं",
    backBtn: "पीछे",
    proceedToPayment: "बुकिंग और भुगतान की पुष्टि करें",
    selectSeatsFirst: "कृपया एक सीट चुनें",
    currPrice: "कुल: "
  },
  ne: {
    appName: "वासला",
    tagline: "दुबई यात्रु ट्रान्सिट प्लेटफर्म",
    loginTitle: "पुन: स्वागत छ",
    loginSub: "दैनिक यात्राहरू व्यवस्थापन गर्न लगइन गर्नुहोस्",
    phonePlaceholder: "फोन नम्बर (05xxxxxxxx)",
    passPlaceholder: "पासवर्ड",
    loginBtn: "लगइन गर्नुहोस् / दर्ता गर्नुहोस्",
    planTitle: "तपाईंको हप्ताको योजना बनाउनुहोस्",
    planSub: "सक्रिय कार्य दिनहरू र समय चयन गर्नुहोस्",
    activeDays: "सक्रिय कार्य दिनहरू",
    routeLabel: "प्राथमिकता मार्ग",
    busTypeLabel: "बस क्षमता र प्रकार",
    timeLabel: "प्रस्थान समय",
    subLabel: "सदस्यता योजना",
    weeklyPass: "साप्ताहिक पास",
    monthlyPass: "मासिक पास",
    tabbyOption: "Tabby सँग ४ किस्तामा भुक्तानी गर्नुहोस्",
    confirmPlanBtn: "योजना पुष्टि गर्नुहोस्",
    seatTitle: "सीट चयन गर्नुहोस्",
    seatSub: "बसमा आफ्नो मनपर्ने सीट छान्नुहोस्",
    front: "अगाडि (चालक)",
    confirmSeat: "सीट पुष्टि गर्नुहोस्",
    ticketTitle: "बोर्डिङ पास",
    ticketSub: "बसमा चढ्दा QR कोड स्क्यान गर्नुहोस्",
    seatNum: "सीट नम्बर:",
    depTime: "प्रस्थान:",
    route: "मार्ग:",
    trackBusBtn: "बस प्रत्यक्ष ट्र्याक गर्नुहोस्",
    trackerTitle: "प्रत्यक्ष बस ट्र्याकर",
    trackerSub: "बस DXB-A-45821 · गन्तव्यतर्फ",
    eta: "अनुमानित आगमन",
    minutes: "मिनेट",
    backToHome: "गृहपृष्ठमा फर्कनुहोस्",
    backBtn: "फर्किनुहोस्",
    proceedToPayment: "बुकिङ र भुक्तानी पुष्टि गर्नुहोस्",
    selectSeatsFirst: "कृपया एक सीट चयन गर्नुहोस्",
    currPrice: "जम्मा: "
  }
};

const LANGUAGES = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'اردو' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ne', label: 'नेपाली' }
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIMES = ['07:00 AM', '07:45 AM', '08:30 AM'];
const BUS_CAPACITIES = [
  { id: 12, name: 'Van (12 Seats)' },
  { id: 15, name: 'HiAce (15 Seats)' },
  { id: 30, name: 'Coaster (30 Seats)' },
  { id: 60, name: 'Coach Bus (60 Seats)' }
];

// ==========================================
// 2. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  // Screen state navigation: 'LOGIN' | 'PLAN' | 'SEAT' | 'TICKET' | 'TRACKER'
  const [screen, setScreen] = useState('LOGIN');
  const [loading, setLoading] = useState(false);

  // User Auth State
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Booking Data States
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu']);
  const [selectedRoute, setSelectedRoute] = useState(1);
  const [selectedCapacity, setSelectedCapacity] = useState(15);
  const [selectedTime, setSelectedTime] = useState('07:45 AM');
  const [subTier, setSubTier] = useState('monthly');
  const [tabby, setTabby] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Animation for Live Bus Tracking
  const [busProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (screen === 'TRACKER') {
      busProgress.setValue(0);
      Animated.loop(
        Animated.timing(busProgress, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [screen]);

  // SUPABASE: Auth Handler (Login or Auto-Register)
  const handleAuth = async () => {
    if (!phone || !password) {
      alert("يرجى كتابة رقم الهاتف وكلمة المرور");
      return;
    }
    setLoading(true);
    try {
      // Check if user exists
      let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single();

      if (!user) {
        // Auto register if not found
        const { data: newUser, error: regError } = await supabase
          .from('users')
          .insert([{ phone, password_hash: password, preferred_language: lang }])
          .select()
          .single();

        if (regError) throw regError;
        user = newUser;
      }

      setCurrentUser(user);
      setScreen('PLAN');
    } catch (err) {
      alert("خطأ أثناء الاتصال بالداتا بيس: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // SUPABASE: Load Booked Seats for Selected Bus Capacity
  const loadBookedSeats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('seat_number')
        .eq('status', 'confirmed');

      if (!error && data) {
        setBookedSeats(data.map(b => b.seat_number));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setScreen('SEAT');
    }
  };

  // SUPABASE: Save Booking to Database
  const handleConfirmBooking = async () => {
    if (!selectedSeat) return;
    setLoading(true);
    try {
      const priceAmount = subTier === 'monthly' ? 420 : 130;

      // 1. Insert into Bookings Table
      const { data: booking, error: bErr } = await supabase
        .from('bookings')
        .insert([{
          user_id: currentUser?.id,
          seat_number: selectedSeat,
          status: 'confirmed',
          payment_status: 'paid'
        }])
        .select()
        .single();

      if (bErr) throw bErr;

      // 2. Insert into Payments Table
      await supabase.from('payments').insert([{
        booking_id: booking.id,
        user_id: currentUser?.id,
        amount: priceAmount,
        currency: 'AED',
        status: 'CAPTURED',
        payment_method: tabby ? 'Tabby' : 'Card'
      }]);

      setScreen('TICKET');
    } catch (err) {
      alert("فشل حفظ الحجز في الداتا بيس: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const price = subTier === 'monthly' ? 420 : 130;

  const seatsList = Array.from({ length: selectedCapacity }, (_, i) => ({
    id: i + 1,
    booked: bookedSeats.includes(i + 1),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1120" />

      {/* HEADER TOP BAR WITH 5 LANGUAGES & BACK BUTTON */}
      <View style={styles.header}>
        {screen !== 'LOGIN' ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => {
            if (screen === 'PLAN') setScreen('LOGIN');
            else if (screen === 'SEAT') setScreen('PLAN');
            else if (screen === 'TICKET') setScreen('SEAT');
            else if (screen === 'TRACKER') setScreen('TICKET');
          }}>
            <Text style={styles.backBtnText}>‹ {t.backBtn}</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 50 }} />}

        <Text style={styles.logoText}>{t.appName}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 35 }}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {LANGUAGES.map(item => (
              <TouchableOpacity
                key={item.code}
                style={[styles.langBtn, lang === item.code && styles.langBtnActive]}
                onPress={() => setLang(item.code)}
              >
                <Text style={[styles.langBtnText, lang === item.code && { color: '#1A1305' }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* SCREEN 1: LOGIN WITH SUPABASE */}
      {screen === 'LOGIN' && (
        <ScrollView contentContainerStyle={styles.scrollBody}>
          <View style={styles.authBox}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>DUBAI FLEET SERVICES</Text>
            </View>
            <Text style={styles.title}>{t.loginTitle}</Text>
            <Text style={styles.subtitle}>{t.loginSub}</Text>

            <TextInput
              style={[styles.input, { textAlign: lang === 'ar' || lang === 'ur' ? 'right' : 'left' }]}
              placeholder={t.phonePlaceholder}
              placeholderTextColor="#8B94A8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={[styles.input, { textAlign: lang === 'ar' || lang === 'ur' ? 'right' : 'left' }]}
              placeholder={t.passPlaceholder}
              placeholderTextColor="#8B94A8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleAuth} disabled={loading}>
              {loading ? <ActivityIndicator color="#1A1305" /> : <Text style={styles.primaryBtnText}>{t.loginBtn}</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* SCREEN 2: PLAN & BUS SELECTION */}
      {screen === 'PLAN' && (
        <ScrollView contentContainerStyle={styles.scrollBody}>
          <Text style={styles.title}>{t.planTitle}</Text>
          <Text style={styles.subtitle}>{t.planSub}</Text>

          <Text style={styles.label}>{t.activeDays}</Text>
          <View style={styles.rowPills}>
            {DAYS.map(day => (
              <TouchableOpacity
                key={day}
                style={[styles.dayPill, selectedDays.includes(day) && styles.activePill]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.pillText, selectedDays.includes(day) && styles.activePillText]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t.busTypeLabel}</Text>
          <View style={styles.rowPills}>
            {BUS_CAPACITIES.map(bus => (
              <TouchableOpacity
                key={bus.id}
                style={[styles.pill, selectedCapacity === bus.id && styles.activePill]}
                onPress={() => setSelectedCapacity(bus.id)}
              >
                <Text style={[styles.pillText, selectedCapacity === bus.id && styles.activePillText]}>{bus.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t.routeLabel}</Text>
          <TouchableOpacity
            style={[styles.card, selectedRoute === 1 && styles.cardSelected]}
            onPress={() => setSelectedRoute(1)}
          >
            <Text style={styles.cardTitle}>Route 1: Satwa ➔ Dubai Marina</Text>
            <Text style={styles.cardSub}>Express Commute via Sheikh Zayed Rd</Text>
          </TouchableOpacity>

          <Text style={styles.label}>{t.timeLabel}</Text>
          <View style={styles.rowPills}>
            {TIMES.map(tm => (
              <TouchableOpacity
                key={tm}
                style={[styles.pill, selectedTime === tm && styles.activePill]}
                onPress={() => setSelectedTime(tm)}
              >
                <Text style={[styles.pillText, selectedTime === tm && styles.activePillText]}>{tm}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t.subLabel}</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleBtn, subTier === 'weekly' && styles.toggleBtnActive]}
              onPress={() => setSubTier('weekly')}
            >
              <Text style={[styles.toggleBtnText, subTier === 'weekly' && styles.toggleBtnTextActive]}>{t.weeklyPass}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, subTier === 'monthly' && styles.toggleBtnActive]}
              onPress={() => setSubTier('monthly')}
            >
              <Text style={[styles.toggleBtnText, subTier === 'monthly' && styles.toggleBtnTextActive]}>{t.monthlyPass}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => setTabby(!tabby)}>
            <View style={[styles.checkbox, tabby && styles.checkboxOn]}>
              {tabby && <Text style={styles.checkIcon}>✓</Text>}
            </View>
            <Text style={styles.checkText}>{t.tabbyOption}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={loadBookedSeats}>
            {loading ? <ActivityIndicator color="#1A1305" /> : (
              <Text style={styles.primaryBtnText}>{t.confirmPlanBtn} · AED {price}</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 3: SEAT */}
      {screen === 'SEAT' && (
        <ScrollView contentContainerStyle={styles.scrollBody}>
          <Text style={styles.title}>{t.seatTitle}</Text>
          <Text style={styles.subtitle}>{t.seatSub}</Text>

          <View style={styles.busLayout}>
            <View style={styles.driverSection}>
              <Text style={styles.driverText}>🚌 {t.front}</Text>
            </View>

            <View style={styles.seatsGrid}>
              {seatsList.map(seat => {
                const isSelected = selectedSeat === seat.id;
                return (
                  <TouchableOpacity
                    key={seat.id}
                    disabled={seat.booked}
                    style={[
                      styles.seatBox,
                      seat.booked && styles.seatBooked,
                      isSelected && styles.seatSelected,
                    ]}
                    onPress={() => setSelectedSeat(seat.id)}
                  >
                    <Text style={[styles.seatText, isSelected && styles.seatTextSelected]}>
                      {seat.booked ? 'X' : seat.id}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, !selectedSeat && { opacity: 0.5 }]}
            disabled={!selectedSeat || loading}
            onPress={handleConfirmBooking}
          >
            {loading ? <ActivityIndicator color="#1A1305" /> : (
              <Text style={styles.primaryBtnText}>
                {selectedSeat ? t.confirmSeat : t.selectSeatsFirst}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 4: TICKET */}
      {screen === 'TICKET' && (
        <ScrollView contentContainerStyle={styles.scrollBody}>
          <View style={styles.ticketCard}>
            <Text style={styles.ticketHeader}>{t.ticketTitle}</Text>
            <Text style={styles.ticketSub}>{t.ticketSub}</Text>

            <View style={styles.qrCodeBox}>
              <View style={styles.qrMockRow}>
                <View style={styles.qrSquare} />
                <View style={[styles.qrSquare, { backgroundColor: '#0B1120' }]} />
                <View style={styles.qrSquare} />
              </View>
              <View style={styles.qrMockRow}>
                <View style={[styles.qrSquare, { backgroundColor: '#0B1120' }]} />
                <View style={styles.qrSquare} />
                <View style={[styles.qrSquare, { backgroundColor: '#0B1120' }]} />
              </View>
            </View>

            <View style={styles.ticketInfoGroup}>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>{t.seatNum}</Text> #{selectedSeat}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>{t.depTime}</Text> {selectedTime}</Text>
              <Text style={styles.infoLine}><Text style={styles.boldLabel}>{t.route}</Text> Satwa ➔ Marina</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#1FAE7A' }]} onPress={() => setScreen('TRACKER')}>
            <Text style={[styles.primaryBtnText, { color: '#FFFFFF' }]}>{t.proceedToPayment}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* SCREEN 5: TRACKER */}
      {screen === 'TRACKER' && (
        <ScrollView contentContainerStyle={styles.scrollBody}>
          <Text style={styles.title}>{t.trackerTitle}</Text>
          <Text style={styles.subtitle}>{t.trackerSub}</Text>

          <View style={styles.mapCanvas}>
            <View style={styles.mapGridLine} />
            <View style={styles.mapTrackPath} />

            <Animated.View
              style={[
                styles.busMarker,
                {
                  left: busProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['5%', '85%'],
                  }),
                },
              ]}
            >
              <Text style={{ fontSize: 16 }}>🚌</Text>
            </Animated.View>

            <View style={[styles.stopPin, { left: '5%' }]}>
              <Text style={styles.stopPinText}>Satwa</Text>
            </View>
            <View style={[styles.stopPin, { left: '85%', backgroundColor: '#1FAE7A' }]}>
              <Text style={styles.stopPinText}>Marina</Text>
            </View>
          </View>

          <View style={styles.etaCard}>
            <Text style={styles.etaLabel}>{t.eta}</Text>
            <Text style={styles.etaValue}>12 <Text style={{ fontSize: 16, color: '#8B94A8' }}>{t.minutes}</Text></Text>
          </View>

          <TouchableOpacity style={[styles.primaryBtn, { marginTop: 20 }]} onPress={() => setScreen('PLAN')}>
            <Text style={styles.primaryBtnText}>{t.backToHome}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

// ==========================================
// 3. STYLES
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245,243,238,0.08)',
  },
  logoText: {
    color: '#E8A33D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backBtnText: {
    color: '#E8A33D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  langBtn: {
    backgroundColor: '#182238',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.16)',
  },
  langBtnActive: {
    backgroundColor: '#E8A33D',
    borderColor: '#E8A33D',
  },
  langBtnText: {
    color: '#F5F3EE',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollBody: {
    padding: 20,
  },
  authBox: {
    marginTop: 40,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(232,163,61,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 15,
  },
  badgeText: {
    color: '#E8A33D',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: '#F5F3EE',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#8B94A8',
    fontSize: 13,
    marginBottom: 20,
  },
  label: {
    color: '#8B94A8',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#121A2E',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
    borderRadius: 12,
    padding: 15,
    color: '#F5F3EE',
    fontSize: 14,
    marginBottom: 15,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#E8A33D',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryBtnText: {
    color: '#1A1305',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rowPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayPill: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#182238',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#182238',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
  },
  activePill: {
    backgroundColor: '#E8A33D',
    borderColor: '#E8A33D',
  },
  pillText: {
    color: '#8B94A8',
    fontWeight: '600',
    fontSize: 12,
  },
  activePillText: {
    color: '#1A1305',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#121A2E',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  cardSelected: {
    borderColor: '#E8A33D',
    backgroundColor: 'rgba(232,163,61,0.05)',
  },
  cardTitle: {
    color: '#F5F3EE',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSub: {
    color: '#8B94A8',
    fontSize: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#121A2E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#E8A33D',
  },
  toggleBtnText: {
    color: '#8B94A8',
    fontWeight: 'bold',
    fontSize: 12,
  },
  toggleBtnTextActive: {
    color: '#1A1305',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8B94A8',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOn: {
    backgroundColor: '#E8A33D',
    borderColor: '#E8A33D',
  },
  checkIcon: {
    color: '#1A1305',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkText: {
    color: '#8B94A8',
    fontSize: 12,
  },
  busLayout: {
    backgroundColor: '#121A2E',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  driverSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245,243,238,0.1)',
    width: '100%',
    paddingBottom: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  driverText: {
    color: '#8B94A8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  seatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  seatBox: {
    width: (width - 110) / 4,
    height: 40,
    backgroundColor: '#182238',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.1)',
  },
  seatBooked: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'transparent',
  },
  seatSelected: {
    backgroundColor: '#E8A33D',
    borderColor: '#E8A33D',
  },
  seatText: {
    color: '#F5F3EE',
    fontWeight: 'bold',
  },
  seatTextSelected: {
    color: '#1A1305',
  },
  ticketCard: {
    backgroundColor: '#121A2E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
  },
  ticketHeader: {
    color: '#F5F3EE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketSub: {
    color: '#8B94A8',
    fontSize: 11,
    marginTop: 4,
  },
  qrCodeBox: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  qrMockRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  qrSquare: {
    width: 25,
    height: 25,
    backgroundColor: '#0B1120',
  },
  ticketInfoGroup: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(245,243,238,0.08)',
    paddingTop: 12,
  },
  infoLine: {
    color: '#F5F3EE',
    fontSize: 13,
    marginBottom: 6,
  },
  boldLabel: {
    color: '#8B94A8',
    fontWeight: 'bold',
  },
  mapCanvas: {
    height: 160,
    backgroundColor: '#121A2E',
    borderRadius: 16,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    overflow: 'hidden',
  },
  mapGridLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(245,243,238,0.05)',
  },
  mapTrackPath: {
    height: 4,
    backgroundColor: 'rgba(232,163,61,0.3)',
    borderRadius: 2,
  },
  busMarker: {
    position: 'absolute',
    top: '38%',
    backgroundColor: '#E8A33D',
    padding: 6,
    borderRadius: 20,
  },
  stopPin: {
    position: 'absolute',
    top: '65%',
    backgroundColor: '#182238',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stopPinText: {
    color: '#F5F3EE',
    fontSize: 10,
    fontWeight: 'bold',
  },
  etaCard: {
    backgroundColor: '#121A2E',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(245,243,238,0.08)',
  },
  etaLabel: {
    color: '#8B94A8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  etaValue: {
    color: '#E8A33D',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
