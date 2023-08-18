import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from './components/Icons';
import { useEffect, useState } from 'react';

function App(): JSX.Element {
  const [isGameStarted, setisGameStarted] = useState<boolean>(false)
  const [currentPlayer, setCurrentPlayer] = useState<string>("circle")
  const [gameStatus, setGameStatus] = useState<string>("")
  const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty', 0, 9))


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
      // setisGameStarted(false)
    }
  }

  const handlePress = (index: number) => {
    if (gameStatus !== "") {
      // SHOW SNACKBAR
      return
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
      // SHOW SNACKBAR
    }
  }


  useEffect(() => {
    if (isGameStarted) {
      checkWinner()
      setCurrentPlayer(currentPlayer => currentPlayer === 'circle' ? 'cross' : 'circle')
    }
  }, [gameState])

  useEffect(() => { }, [isGameStarted])

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View
          style={[styles.header,
          {
            backgroundColor: !gameStatus ? "#CAD5E2" :
              gameStatus !== "Draw! Restart Again" ? "#4DD637" : "#758283"
          }]}>
          {gameStatus !== "" ? (
            <Text style={styles.gameStatusText}>{gameStatus}</Text>
          ) : (
            <View style={styles.playerInfo}>
              <Text style={styles.playerText}>Current Player :</Text>
              <Icons name={currentPlayer} />
            </View>
          )}
        </View>
        <FlatList
          style={styles.gameBoard}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          data={gameState}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handlePress(index)} style={styles.boardTile}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <View style={styles.buttonContainer}>
          {isGameStarted && (
            <Pressable onPress={reStartGame} style={styles.button}>
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
    backgroundColor: 'black',
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
  playerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
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
    backgroundColor: 'white'
  },
  buttonContainer: {
    height: 45
  },
  button: {
    borderRadius: 10,
    width: 200,
    backgroundColor: '#51E1ED',
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
  gameStatusText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default App;
