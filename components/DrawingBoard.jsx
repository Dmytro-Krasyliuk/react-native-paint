import { View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import React from 'react'

const DrawingBoard = () => {
  const [currentPath, setCurrentPath] = React.useState("");
  const [paths, setPaths] = React.useState([]);

  const onGestureEvent = React.useCallback((event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      let { x, y } = event.nativeEvent;
      let newPoint = `${x},${y}`;
      setCurrentPath((currentPath) =>
        currentPath ? `${currentPath} L ${newPoint}` : `M ${newPoint}`
      );
    }
  }, []);

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setPaths((paths) => [...paths, currentPath]);
      setCurrentPath("");
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Svg style={styles.drawingArea}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="black"
              strokeWidth={2}
              fill="none"
            />
          ))}
          {currentPath ? (
            <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />
          ) : null}
        </Svg>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "100vh",
  },
  drawingArea: {
    width: 800,
    height: "100vh",
    backgroundColor: "transparent",
    borderWidth: '2px',
    borderColor: 'black',
    borderStyle: 'solid'
  },
});

export default DrawingBoard;
