import {makeStyles} from "@material-ui/core/styles";


export const useAdminStyles = makeStyles({
	container: {overflowX: 'hidden'},
})

export const useTableFormStyles = makeStyles({
	form: {display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'},
	fields: {display: 'flex', maxWidth: '90%',},
	buttons: {flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}
})

export const useAutocompleteStyle = makeStyles({
	root: {margin: '16px', minWidth: '130px'},
	label: {textTransform: 'Capitalize'}
})

export const usePickerStyles = makeStyles({
	root: {
		margin: '16px',
		maxWidth: '140px',
		minWidth: '100px'
	}
});

export const useSelectStyles = makeStyles({
	root: {
		margin: '16px',
		minWidth: '80px'
	},
})

export const useFieldStyles = makeStyles({
	smallInput: {fontSize: '14px'},
	idInput: {
		color: 'lightgray', fontSize: '14px', width: '40px',
		'&:hover': {cursor: 'auto'}
	},
	label: {textTransform: 'capitalize'},
	helper: {}
})

export const useTableStyles = makeStyles({
	wrap: {
		width: 'fit-content',
		margin: '0 auto'
	},
	root: {
		width: 'fit-content',
		margin: "0px auto 80px",
	},
	box: {minHeight: '100px'},
	table: {
		minWidth: 600,
		width: 'auto'
	},
	head: {
		textTransform: 'capitalize',
		background: '#bfbfbf33'
	},
});

export const useLoaderStyles = makeStyles({
	backdrop: {
		zIndex: 1301,
		color: '#fff',
	},
});

export const useMasterListStyle = makeStyles({
	root: {
		maxWidth: '300px',
		margin: '24px'
	},
	box: {margin: '50px 0 20px'},
	listWrap: {display: 'flex', margin: '50px auto', padding: '30px', flexWrap: 'wrap'},
});

export const useToastStyle = makeStyles({
	msgBox: {padding: '16px'},
})

export const useHomeStyle = makeStyles({
	container: {overflowX: 'hidden'},
	wrap: {width: '70%', margin: '0 auto'},
	msgBox: {padding: '16px'},
	title: {textAlign: 'center', margin: '50px 0 0'}
})


export const useLoginFormStyles = makeStyles({
	button: {marginRight: '16px'},
	title: {padding: '16px 24px 16px'},
	dialog: {'&.MuiDialog-root': {margin: '0', padding: '0 24px 32px', zIndex: '1200'}},
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
	content: {padding: '0px 24px 16px'},
	fields: {marginBottom: '16px'},
	btnWrap: {margin: '16px 0 16px'}
})

export const useNavStyles = makeStyles({
	root: {
		spaceBetween: 'justifyContent',
	},
	title: {
		textDecoration: "none",
		color: "white",
		fontSize: '16px',
	},
	buttons: {
		display: 'flex',
		flexGrow: '1',
		justifyContent: 'flex-end'
	}
})

export const useSearchFormStyles = makeStyles({
	container: {
		padding: '30px',
		flexWrap: 'wrap',
		margin: '50px auto',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	wrap: {
		margin: '30px 0 0',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	btn: {
		margin: '10px',
	},
});