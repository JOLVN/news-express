import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ViewToken,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useThemeColors } from '@/hooks/useThemeColors';
import { formatDate } from '@/functions/date';
import { Ionicons } from '@expo/vector-icons';

const CONTAINER_WIDTH = 110;
const ITEM_WIDTH = CONTAINER_WIDTH;

type Props = {
    onDateChange: (date: string) => void;
    style?: object;
};

export default function DateCarousel({ onDateChange, style }: Props) {

    const colors = useThemeColors();
    const flatListRef = useRef<FlatList>(null);
    const lastDate = useRef<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(6);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({
                index: newIndex,
                animated: true
            });
            const newDate = formatDate(dates[newIndex]);
            lastDate.current = newDate;
            onDateChange(newDate);
        }
    };

    const handleNext = () => {
        if (currentIndex < dates.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({
                index: newIndex,
                animated: true
            });
            const newDate = formatDate(dates[newIndex]);
            lastDate.current = newDate;
            onDateChange(newDate);
        }
    };

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date;
    });

    const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0]?.item) {
            const index = dates.findIndex(date => 
                date.getTime() === viewableItems[0].item.getTime()
            );
            setCurrentIndex(index);
            const newDate = formatDate(viewableItems[0].item);
            if (newDate && newDate !== lastDate.current) {
                lastDate.current = newDate;
                onDateChange(newDate);
            }
        }
    }).current;

    const viewConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
        minimumViewTime: 150,
        waitForInteraction: true
    }).current;

    useEffect(() => {        
        flatListRef.current?.scrollToIndex({
            index: currentIndex,
            animated: false
        });
    }, []);

    const renderItem = ({ item }: { item: Date }) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        let displayText = '';
        if (item.toDateString() === today.toDateString()) {
            displayText = "Aujourd'hui";
        } else if (item.toDateString() === yesterday.toDateString()) {
            displayText = "Hier";
        } else {
            displayText = format(item, 'EEEE d', { locale: fr });
        }
        return (
            <View style={styles.itemContainer}>
                <Animated.Text style={[styles.dateText, { color: colors.text }]}>
                    {displayText}
                </Animated.Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Ionicons 
                name="arrow-back" 
                size={24} 
                color={currentIndex === 0 ? colors.gray500 : colors.text}
                onPress={handlePrevious}
            />
            <View style={[styles.boxContainer, style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
                <FlatList
                    ref={flatListRef}
                    data={dates}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.toISOString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    disableIntervalMomentum={true}
                    snapToInterval={ITEM_WIDTH}
                    decelerationRate="fast"
                    bounces={false}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                />
            </View>
            <Ionicons 
                name="arrow-forward" 
                size={24} 
                color={currentIndex === dates.length - 1 ? colors.gray500 : colors.text}
                onPress={handleNext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boxContainer: {
        width: CONTAINER_WIDTH,
        height: 35,
        alignSelf: 'center',
        borderRadius: 16,
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 5,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
    },
});
