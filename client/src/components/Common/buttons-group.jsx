import TableButton from "./table-button";
import {Clear, Done} from "@material-ui/icons";
import {TableRow} from "@material-ui/core";
import React from "react";


const ButtonsGroup = (props) => {
const {accept, cancel} = props

	return (
		<>
			<TableButton handleClick={() => accept()} title='Accept'
									 icon={<Done fontSize="small"/>}/>
			<TableButton handleClick={() => cancel()} title='Cancel' icon={<Clear fontSize="small"/>}/>
		</>
	)
}

export default ButtonsGroup