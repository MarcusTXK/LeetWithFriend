import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import MatchForm from './MatchForm'
import io from 'socket.io-client'
import MatchTimer from './MatchTimer'
import MatchTimeout from './MatchTimeout'
import { useNavigate } from 'react-router-dom'
import { URI_MATCHING_SERVICE, EVENT_EMIT, EVENT_LISTEN } from '../../constants'
import MatchError from './MatchError'

const PHASES = {
  SELECT: 'SELECT',
  FINDING: 'FINDING',
  TIMEOUT: 'TIMEOUT',
  ERROR: 'ERROR',
}

const MatchDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [difficulty, setDifficulty] = useState('')
  const [phase, setPhase] = useState(PHASES.SELECT)
  const [socket, setSocket] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const newSocket = io(URI_MATCHING_SERVICE)
    setSocket(newSocket)
    newSocket.on(EVENT_LISTEN.MATCHING, () => console.log('matching'))
    newSocket.on(EVENT_LISTEN.MATCH_SUCCESS, (payload) => {
      console.log('match success')
      navigate(`/room?roomId=${payload.room}`)
    })
    newSocket.on(EVENT_LISTEN.MATCH_FAIL, () => {
      console.log('match error')
      setPhase(PHASES.ERROR)
    })
    newSocket.on(EVENT_LISTEN.MATCH_TIMEOUT, () => {
      console.log('timed out')
      setPhase(PHASES.TIMEOUT)
    })
    return () => newSocket.close()
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit(EVENT_EMIT.MATCH_FIND, { difficulty: difficulty })
    setPhase(PHASES.FINDING)
  }

  const handleOpen = () => {
    setPhase(PHASES.SELECT)
    onOpen()
  }

  const handleClose = () => {
    socket.emit(EVENT_EMIT.MATCH_CANCEL, () => console.log('Cancelled'))
    onClose()
  }

  const renderBody = () => {
    switch (phase) {
      case PHASES.SELECT:
        return (
          <MatchForm
            onClose={handleClose}
            onSubmit={handleSubmit}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        )
      case PHASES.FINDING:
        return <MatchTimer currDate={new Date()} onClose={handleClose} />
      case PHASES.TIMEOUT:
        return (
          <MatchTimeout
            onClose={handleClose}
            handleRetry={() => setPhase(PHASES.SELECT)}
          />
        )
      default:
        return (
          <MatchError
            onClose={handleClose}
            handleRetry={() => setPhase(PHASES.SELECT)}
          />
        )
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>Find Match</Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>{renderBody()}</ModalContent>
      </Modal>
    </>
  )
}

export default MatchDialog