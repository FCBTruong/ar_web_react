import * as React from 'react'
import MuseumForm from './MuseumForm'
import user from 'apis/user';

export default function MuseumEdit(props) {
    var editingMuseumId = localStorage.getItem("editing_museum_id");
    const museum = user.getMuseumById(editingMuseumId)
    return (<div>
        <br/>
        <MuseumForm mode='update' museum={museum}></MuseumForm>
    </div>)
}