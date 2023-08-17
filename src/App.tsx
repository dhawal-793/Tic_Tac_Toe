import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from './components/Icons';
import { useState } from 'react';

function App(): JSX.Element {

  const [currentPlayer, setCurrentPlayer] = useState<string>("circle")
  const [gameWinner, setGameWinner] = useState<string>("")
  const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty', 0, 9))


  const reStartGame = () => {
    setGameState(new Array(9).fill('empty', 0, 9))
    setGameWinner("")
    setCurrentPlayer("circle")
  }

  const checkWinner = () => {
    if (gameState[0] !== 'empty' && gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
      setGameWinner(`${gameState[0]} won the game`)
    }
    else if (gameState[3] !== 'empty' && gameState[3] === gameState[4] && gameState[4] === gameState[5]) {
      setGameWinner(`${gameState[3]} won the game`)
    }
    else if (gameState[6] !== 'empty' && gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
      setGameWinner(`${gameState[6]} won the game`)
    }
    if (gameState[0] !== 'empty' && gameState[0] === gameState[3] && gameState[3] === gameState[6]) {
      setGameWinner(`${gameState[0]} won the game`)
    }
    else if (gameState[1] !== 'empty' && gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
      setGameWinner(`${gameState[1]} won the game`)
    }
    else if (gameState[2] !== 'empty' && gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
      setGameWinner(`${gameState[2]} won the game`)
    }
    else if (gameState[0] !== 'empty' && gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
      setGameWinner(`${gameState[0]} won the game`)
    }
    else if (gameState[2] !== 'empty' && gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
      setGameWinner(`${gameState[2]} won the game`)
    }
  }

  const handlePress = (index: number) => {
    if (gameWinner !== "") {
      // SHOW SNACKBAR
    }
    if (gameState[index] === 'empty') {
      setGameState(gameState.map((item, i) => {
        if (i === index) {
          return currentPlayer
        }
        return item
      }))
      checkWinner()
      if (currentPlayer === 'circle') {
        setCurrentPlayer('cross')
      }
      else {
        setCurrentPlayer('circle')
      }
    }
    else {
      // SHOW SNACKBAR
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Tic Tac Toe</Text>
        <View>
          <Icons name="circle" />
          <Icons name="cross" />
          <Icons name="crossds" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
