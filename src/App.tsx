import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';

import Icons from './components/Icons';

function App(): JSX.Element {
  const [isGameStarted, setisGameStarted] = useState<boolean>(false)
  const [currentPlayer, setCurrentPlayer] = useState<string>("circle")
  const [gameStatus, setGameStatus] = useState<string>("")
  const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty', 0, 9))

  const isDarkMode = useColorScheme() === 'dark';

  const reStartGame = () => {
    setisGameStarted(false)
    setGameState(new Array(9).fill('empty', 0, 9))
    setGameStatus("")
    setCurrentPlayer("circle")
  }

  const checkWinner = () => {
    if (gameState[0] !== 'empty' && gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
      setGameStatus(`${gameState[0]} won the game`)
    }
    else if (gameState[3] !== 'empty' && gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
      setGameStatus(`${gameState[3]} won the game`)
    }
    else if (gameState[6] !== 'empty' && gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
      setGameStatus(`${gameState[6]} won the game`)
    }
    if (gameState[0] !== 'empty' && gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
      setGameStatus(`${gameState[0]} won the game`)
    }
    else if (gameState[1] !== 'empty' && gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
      setGameStatus(`${gameState[1]} won the game`)
    }
    else if (gameState[2] !== 'empty' && gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
      setGameStatus(`${gameState[2]} won the game`)
    }
    else if (gameState[0] !== 'empty' && gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
      setGameStatus(`${gameState[0]} won the game`)
    }
    else if (gameState[2] !== 'empty' && gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
      setGameStatus(`${gameState[2]} won the game`)
    }
    else if (gameState[0] !== 'empty' && gameState[1] !== 'empty' && gameState[2] !== 'empty' &&
      gameState[3] !== 'empty' && gameState[4] !== 'empty' && gameState[5] !== 'empty' &&
      gameState[6] !== 'empty' && gameState[7] !== 'empty' && gameState[8] !== 'empty'
    ) {
      setGameStatus(`Draw! Restart Again`)
    }
  }

  const handlePress = (index: number) => {
    if (gameStatus !== "") {
      return Snackbar.show({
        text: 'Restart the Game to continue playing.',
        textColor: "#ffffff",
        backgroundColor: "#EDC126",
      })
    }
    if (!isGameStarted) setisGameStarted(true)

    if (gameState[index] === 'empty') {
      setGameState(gameState.map((item, i) => {
        if (i === index) {
          return currentPlayer
        }
        return item
      }))
    }
    else {
      Snackbar.show({
        text: 'You cannot play at already played position.',
        textColor: "#ffffff",
        backgroundColor: "#E21717",
      })
    }
  }


  useEffect(() => {
    if (isGameStarted) {
      checkWinner()
      setCurrentPlayer(currentPlayer => currentPlayer === 'circle' ? 'cross' : 'circle')
    }
  }, [gameState])

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.gameContainer}>
        <View
          style={[styles.header, {
            backgroundColor: !gameStatus ? "#758283" :
              gameStatus !== "Draw! Restart Again" ? "#4DD637" : "#242B2E"
          }]}>
          {gameStatus !== "" ? (
            gameStatus === "Draw! Restart Again" ?
              <Text style={styles.gameStatusText}>
                Draw! Restart Again
              </Text>
              :
              <View style={styles.playerInfo}>
                <Text style={styles.gameStatusText}>Winner:</Text>
                <Icons name={currentPlayer} size={22} />
              </View>
          ) : (
            <View style={styles.playerInfo}>
              <Text style={styles.gameStatusText}>Current Player :</Text>
              <Icons name={currentPlayer} size={22} />
            </View>
          )}
        </View>
        <FlatList
          style={styles.gameBoard}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          data={gameState}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handlePress(index)} style={[styles.boardTile, { backgroundColor: isDarkMode ? '#6A1B4D' : '#c5ecf0' }]}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <View style={styles.buttonContainer}>
          {isGameStarted && (
            <Pressable onPress={reStartGame} style={[styles.button,{backgroundColor:isDarkMode?'#207398':'#51E1ED'}]}>
              <Text style={styles.buttonText}>Restart</Text>
            </Pressable>
          )}
        </View>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 84,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 65,
    width: "90%",
    marginHorizontal: 'auto',
  },
  header: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 318,
    marginHorizontal: 'auto',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  gameStatusText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  gameBoard: {
    height: 318,
    margin: 'auto',
    flexGrow: 0
  },
  boardTile: {
    margin: 8,
    width: 90,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonContainer: {
    height: 45
  },
  button: {
    borderRadius: 10,
    width: 200,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
