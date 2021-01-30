import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import TaskCard from '../TaskCard/TaskCard';
import BoardCardCreator from '../BoardCardCreator/BoardCardCreator';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles(() => ({
  board__tasklList: {
    padding: '0 5px',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '5px',
      backgroundColor: '#cecfd1',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#cecfd1',
      borderRadius: '15px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: '#bbbcbc',
      transition: 'all 1s linear',
      '&:hover': {
        backgroundColor: '#989898',
      },
    },
  },
}));

const BoardColumnTaskList = ({ data, columnId }) => {
  const [cards, setCards] = useState(data);

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  useEffect(() => setCards(data), [data]);

  const addCard = async (name) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/cards/',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          position: cards.length,
          columnId,
          ...name,
        },
      };
      const response = await request(requestOptions);

      setCards([...cards, response]);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const deleteCard = (cardId) => {
    const sourceData = [...cards];

    const removedCardIndex = sourceData.findIndex(({ _id: removedId }) => removedId === cardId);
    sourceData.splice(removedCardIndex, 1);

    setCards(sourceData);
  };

  const getListStyle = () => ({
    userSelect: 'none',
    maxHeight: '50%',
    height: 'fit-content',
    minHeight: '100%',
    width: '100%',
  });

  return (
    <>

      <Droppable droppableId={columnId} type="card" ignoreContainerClipping>
        {(provided) => {
          const { droppableProps } = provided;
          return (
            <Box className={classes.board__tasklList}>
              <div
                ref={provided.innerRef}
                data-rbd-droppable-context-id={droppableProps['data-rbd-droppable-context-id']}
                data-rbd-droppable-id={droppableProps['data-rbd-droppable-id']}
                style={{ ...getListStyle() }}
              >
                {cards.map((card, ind) => {
                  const { _id: id } = card;
                  return (
                    <TaskCard
                      index={ind}
                      data={card}
                      key={id}
                      deleteCard={deleteCard}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            </Box>
          );
        }}
      </Droppable>
      <BoardCardCreator
        sourceState={cards}
        setState={setCards}
        containerId={columnId}
        request={addCard}
        type="card"
      />
    </>
  );
};

BoardColumnTaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
  columnId: PropTypes.string,
};

BoardColumnTaskList.defaultProps = {
  data: [],
  columnId: '',
};

export default BoardColumnTaskList;
