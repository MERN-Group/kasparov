import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'
import r_b_img from './assets/r_b.png'
import q_b_img from './assets/q_b.png'
import n_b_img from './assets/n_b.png'
import k_b_img from './assets/k_b.png'
import p_b_img from './assets/p_b.png'
import b_b_img from './assets/b_b.png'
import r_w_img from './assets/r_w.png'
import q_w_img from './assets/q_w.png'
import n_w_img from './assets/n_w.png'
import k_w_img from './assets/k_w.png'
import p_w_img from './assets/p_w.png'
import b_w_img from './assets/b_w.png'

export default function Piece({
    piece: { type, color },
    position,
    }) {
    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`,
        },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() }
        },
    })
    const imgDict = {
        r_b: r_b_img,
        q_b: q_b_img,
        n_b: n_b_img,
        k_b: k_b_img,
        p_b: p_b_img,
        b_b: b_b_img,
        r_w: r_w_img,
        q_w: q_w_img,
        n_w: n_w_img,
        k_w: k_w_img,
        p_w: p_w_img,
        b_w: b_w_img
    }
    const pieceStr = `${type}_${color}`
    return (
        <>
            <DragPreviewImage connect={preview} src={imgDict[pieceStr]} />
            <div className="piece-container" ref={drag} style={{ opacity: isDragging ? 0 : 1 }}>
                <img src={imgDict[pieceStr]} alt="" className="piece" />
            </div>
        </>
    )
}
