import { decodeEntity } from 'html-entities'

export default function EmojiButton({ content, style, handleClick,  }) {
      
    return (<button
                className={style}
                onClick={handleClick} 
            >
                {content}
            </button>)
}