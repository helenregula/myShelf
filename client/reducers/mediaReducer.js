import actions from '../constants/actions.js';

//testing only: production should have state = [] in reducer params
const initialState = {
  media: [],
  idToUpdate: undefined,
//   media: [
//     {
//       _id: 1234,
//       title: 'The Sopranos',
//       type: 'tvShows',
//       currentStatus: 'backlog',
//     },
//     {
//       _id: 1931,
//       title: 'Lost',
//       type: 'tvShows',
//       currentStatus: 'in_progress'
//     },
//     {
//       _id: 19944,
//       title: 'Arrested Development',
//       type: 'tvShows',
//       currentStatus: 'in_progress'
//     },
//     {
//       _id: 39912,
//       title: 'Twin Peaks',
//       type: 'tvShows',
//       currentStatus: 'complete'
//     },
//     {
//       _id: 1348913,
//       title: '"Never Gonna Give You Up"',
//       type: 'songs',
//       currentStatus: 'in_progress',
//       artist: 'Rick Astley'
//     },
//     {
//       _id: 98831923,
//       title: '"Mr. Roboto"',
//       type: 'songs',
//       currentStatus: 'complete',
//       artist: 'Styx'
//     }
//   ],
  selectedType: null
};

const mediaReducer = (state = initialState, action) => {

  switch(action.type) {

    //Expected payload: array of media objects
    case (actions.GET_MEDIA): {
      return {
        ...state,
        media: action.payload
      };
    }

    //Expected payload: media object to be pushed to the current media state array
    case(actions.ADD_MEDIA): {
      const newMedia = [...state.media]
      newMedia.push(action.payload)
      return {
        ...state,
        media: newMedia
      }
    }

    case(actions.UPDATE_ID_INSTATE): {
      return {
        ...state,
        idToUpdate: action.payload
      }
    }

    case(actions.UPDATE_MEDIA_INFO): {
      console.log(action.payload)
      const oldState = [...state.media]
      const newMediaState = [];
      const newMediaObj = action.payload;
      oldState.forEach(el => {
        if (el._id === action.payload._id){
          newMediaState.push(newMediaObj)
        } else {
          newMediaState.push(el);
        }
      })
      return {
        ...state,
        media: [...newMediaState],
        idToUpdate: undefined
      }
    }

    //Expected payload: updated media object at given index position (positioning features not yet implemented)
    case(actions.UPDATE_MEDIA): {
      return {
        ...state,
        media: [...state.media].splice(action.payload.position, 1, action.payload.media)
      }
    }

    //Expected payload: delete media at given index position (positioning features not yet implemented)
    case (actions.DELETE_MEDIA): {
      let newMedia = [...state.media].filter(el => {
        return el._id !== action.payload; 
      })
      console.log(newMedia);
      return {
        ...state,
        media: newMedia
      }
    }

    case (actions.UPDATE_SELECTED_MEDIA_TYPE): {
      return {
        ...state,
        selectedType: action.payload
      }
    }

    default: {
      return state;
    }

  }
}

export default mediaReducer;