import { useState, useRef, useEffect } from "react";
import ReactHowler from "react-howler";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdSkipNext,
  MdOutlineRepeat,
} from "react-icons/md";
import { getRandomNumberDifferentFrom } from "../utils/getRandomNumber";
import { formatTime } from "../lib/formatters";
import { useStoreActions } from "easy-peasy";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(songs.findIndex((s) => s.id === activeSong.id));
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef<ReactHowler>();

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const onShuffle = () => {
    toggleState(setShuffle);
  };

  const onRepeat = () => {
    toggleState(setRepeat);
  };

  const toggleState = (setter) => {
    setter((state) => !state);
  };

  const getColorBasedOn = (state): any => {
    return state ? "white" : "gray.600";
  };

  const previousSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        return getRandomNumberDifferentFrom(state, songs.length);
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    console.log(repeat);
    if (repeat) {
      setSeek(0);
      if (soundRef.current) {
        soundRef.current.seek(0);
      }
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    const seekValue = parseFloat(e[0]);
    setSeek(seekValue);
    soundRef.current.seek(seekValue);
  };

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        if(soundRef.current) {
          setSeek(soundRef.current.seek());
        }
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={() => onEnd()}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            fontSize="24px"
            color={getColorBasedOn(shuffle)}
            aria-label="shuffle"
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            fontSize="24px"
            aria-label="skip previous"
            icon={<MdSkipPrevious />}
            onClick={previousSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              fontSize="40px"
              color="white"
              aria-label="stop"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlaying(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              fontSize="40px"
              color="white"
              aria-label="play"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlaying(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            fontSize="24px"
            aria-label="skip next"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            fontSize="24px"
            color={getColorBasedOn(repeat)}
            aria-label="repeat"
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
