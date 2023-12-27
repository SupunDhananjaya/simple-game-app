import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

export default function Game(props) {
  const [randomNumbers] = useState(
    Array.from({length: props.randomNumberCount}).map(
      () => 1 + Math.floor(10 * Math.random()),
    ),
  );
  const [target] = useState(
    randomNumbers
      .slice(0, props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0),
  );

  const [shuffledNumbers] = useState(shuffle(randomNumbers));

  const [selectedIds, setSelectedIds] = useState([]);

  const [gamestate, setGamestate] = useState();

  const [remainingSeconds, setRemainingSeconds] = useState(props.initSecounds);

  useEffect(() => {
    if (gamestate !== 'PLAYING') {
      return;
    }
    if (remainingSeconds === 0) {
      setGamestate('LOST');
      return;
    }
    if (remainingSeconds > 0) {
      const intervalId = setInterval(() => {
        setRemainingSeconds(remainingSeconds => remainingSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingSeconds, gamestate]);

  const isSelected = index => {
    return selectedIds.indexOf(index) >= 0;
  };

  const selectNumber = index => {
    setSelectedIds([...selectedIds, index]);
  };

  const handlePlayAgain = () => {
    props.onPlayAgain();
  };

  useEffect(() => {
    const checkGameStatus = () => {
      const gameStatus = () => {
        const total = selectedIds.reduce(
          (acc, curr) => acc + shuffledNumbers[curr],
          0,
        );

        if (total < target) {
          return 'PLAYING';
        }

        if (total === target) {
          return 'WON';
        }

        return 'LOST';
      };
      setGamestate(gameStatus());
    };
    checkGameStatus();
  }, [selectedIds, shuffledNumbers, target]);

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gamestate}`]]}>
        {target}
      </Text>
      <View style={styles.valuesContainer}>
        {shuffledNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            id={index}
            randomNumber={randomNumber}
            isDisabled={isSelected(index) || gamestate !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      {gamestate !== 'PLAYING' && (
        <Button title="Play Again" onPress={handlePlayAgain} />
      )}

      <Text>{remainingSeconds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 40,
    marginHorizontal: 50,
    textAlign: 'center',
    padding: 5,
  },
  valuesContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
