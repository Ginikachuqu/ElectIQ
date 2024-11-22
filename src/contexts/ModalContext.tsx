import { createContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModalContext = createContext()

export const ModalProvider = ({ children })  => {
    const [modalContent, setModalContent] = useState(null)

    useEffect(() => {
        if(modalContent) {
            document.body.style.overflow = 'hidden'

            document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }

    }, [modalContent])

    const openModal = (content) => {
        setModalContent(content)
    }

    const closeModal = () => {
        setModalContent(null)
    }
    return (
        <ModalContext.Provider
            value={{ openModal, closeModal}}
        >
            <AnimatePresence>
                {modalContent && (
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className="fixed h-screen w-full inset-0 bg-[hsla(0,0%,9%,0.6)] backdrop-blur-[10px] flex items-center justify-center z-50 overflow-hidden">
                            {modalContent}
                        </motion.div>

                )}
            </AnimatePresence>
                {children}
        </ModalContext.Provider>
    )
}

export default ModalContext