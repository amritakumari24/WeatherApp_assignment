import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';

export default function Index() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    Keyboard.dismiss();

    try {

      const apiKey = process.env.EXPO_PUBLIC_API_KEY || process.env.API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found');
        setWeather(null);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.appWrapper}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>WEATHER APP<Text style={styles.accentText}></Text></Text>
          <Text style={styles.subtitle}>Live Weather Intelligence</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search location (e.g. Mumbai, Tokyo)..."
            placeholderTextColor="#8E9BAE"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather} activeOpacity={0.85}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#60A5FA" />
            <Text style={styles.loaderText}>Fetching real-time satellite data...</Text>
          </View>
        )}

        {/* Error Alert */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Main Weather View */}
        {weather && !loading && (
          <View style={styles.weatherCard}>

            {/* Top Badges */}
            <View style={styles.locationHeader}>
              <Text style={styles.cityName}>
                {weather.name}
              </Text>
              <View style={styles.countryTag}>
                <Text style={styles.countryText}>{weather.sys?.country}</Text>
              </View>
            </View>

            {/* Weather Icon & Main Temp */}
            <View style={styles.heroWeather}>
              {weather.weather && weather.weather[0]?.icon && (
                <Image
                  source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
                  style={styles.weatherIcon}
                />
              )}
              <Text style={styles.tempDisplay}>{Math.round(weather.main?.temp)}°</Text>
              <Text style={styles.conditionText}>{weather.weather && weather.weather[0]?.description}</Text>
            </View>

            {/* Quick Metrics */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>FEELS LIKE</Text>
                <Text style={styles.statValue}>{Math.round(weather.main?.feels_like)}°C</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>HUMIDITY</Text>
                <Text style={styles.statValue}>{weather.main?.humidity}%</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>WIND</Text>
                <Text style={styles.statValue}>{weather.wind?.speed} m/s</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>PRESSURE</Text>
                <Text style={styles.statValue}>{weather.main?.pressure} hPa</Text>
              </View>
            </View>

          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#0F172A', // Slate 900
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  accentText: {
    color: '#38BDF8',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  loaderBox: {
    padding: 30,
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: '#451A03',
    borderWidth: 1,
    borderColor: '#78350F',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#FDBA74',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  weatherCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  countryTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  countryText: {
    color: '#38BDF8',
    fontWeight: '700',
    fontSize: 11,
  },
  heroWeather: {
    alignItems: 'center',
    marginVertical: 8,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  tempDisplay: {
    fontSize: 64,
    fontWeight: '800',
    color: '#F8FAFC',
    marginTop: -8,
  },
  conditionText: {
    fontSize: 16,
    color: '#94A3B8',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    marginTop: 24,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
});