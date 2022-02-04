import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const API_KEY = '5efa613e61cba4d2877695f85784e686'; // 무료 API니깐..
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const icons = {
  Clear: 'day-sunny',
  Clouds: 'day-cloudy',
  Rain: 'rains',
  Drizzle: 'rain',
  Snow: 'snowflake',
  Atmosphere: 'cloudy-gusts',
  Thunderstorm: 'lightnings',
};

export default function App() {
  const [perm, setPerm] = useState(true);
  const [city, setCity] = useState('Loading...');
  const [infos, setInfos] = useState([]);

  const getWeather = async () => {
    // 승인 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPerm(false);
    } else {
      setPerm(true);
      // 위치
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const userLocation = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMap: false }
      );
      setCity(userLocation[0].city);

      // 날씨
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setInfos(data.daily);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {infos.length === 0 ? (
          <View style={styles.dayWeather}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : perm ? (
          infos.map((info, idx) => {
            return (
              <View key={idx} style={styles.dayWeather}>
                <View style={styles.dayWeather_date}>
                  <Text style={styles.dayWeather_date__num}>
                    {new Date(info.dt * 1000).toString().substring(0, 10)}
                  </Text>
                </View>
                <View style={styles.dayWeather_weather}>
                  <View style={styles.dayWeather_temp}>
                    <Text style={styles.dayWeather_temp__num}>
                      {parseFloat(info.temp.day).toFixed(1)}
                    </Text>
                    <Text style={styles.dayWeather_temp__unit}>°C</Text>
                  </View>
                  <View style={styles.dayWeather_desc}>
                    <Fontisto
                      name={icons[info.weather[0].main]}
                      size={40}
                      color="black"
                    />
                    <Text style={styles.dayWeather_desc__num}>
                      {info.weather[0].main}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View>
            <Text>위치 정보 승인이 필요합니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD229',
  },
  city: {
    flex: 0.4,
    justifyContent: 'center',
    marginBottom: -90,
  },
  cityName: {
    fontSize: 48,
    fontWeight: '700',
    color: '#292826',
    marginLeft: 30,
  },
  weather: {},
  dayWeather: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingLeft: 30,
  },
  dayWeather_date: {
    flex: 0.1,
  },
  dayWeather_date__num: {
    fontSize: 24,
    fontWeight: '600',
    color: '#292826',
  },
  dayWeather_weather: {
    flex: 1,
    marginTop: 60,
  },
  dayWeather_temp: {
    flexDirection: 'row',
  },
  dayWeather_temp__num: {
    fontWeight: '700',
    fontSize: 148,
    letterSpacing: -5,
    color: '#292826',
  },
  dayWeather_temp__unit: {
    fontSize: 30,
    fontWeight: '600',
    paddingTop: 20,
    color: '#292826',
  },
  dayWeather_desc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: 5,
  },
  dayWeather_desc__num: {
    fontSize: 48,
    fontWeight: '500',
    color: '#292826',
    marginLeft: 5,
    marginBottom: -3,
  },
});
