import react from 'react'
import Notion from '../../../../asstes/icons/notion.png'
import PlaceHolder from '../../../../asstes/icons/Work in progress-bro.svg'


export default function NotionBoard() {
    return (
        <>
            <div className='integration-board-body'>
                <p>Notion</p>
                <p>Sync your Notion pages with star taskz</p>
                <button>
                    <img src={Notion} alt="" />
                    <p>Add Notion</p>
                </button>
            </div>
            <div className='integration-board-google-placeholder'>
                <img src={PlaceHolder} alt="" />
            </div>
        </>
    )
}