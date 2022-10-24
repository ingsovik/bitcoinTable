import React, { useState } from "react";
import useAPIService from "./apiCall";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles'
import { Container, Typography } from "@mui/material";
import { Button } from '@mui/material'
import unixTime from "../util/unixTime";


const TableMaker = () => {

    /**STYLE ELEMENTS */
    //From mui example
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#CCE0B8",
        }
    }));

    const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
        fontWeight: 600,
        color: 'white',
    }));

    const StyledTableRowHeader = styled(TableRow)(({ theme }) => ({
        fontWeight: 600,
        backgroundColor: '#709C44'
    }));

    const StyledPagiButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#709C44',
        color: 'white',
        margin: '10px',
        display: 'flex',
        flexBasis: '150px',

        '&:hover': {
            color: "black",
            border: "0.8px black solid"
        }
    }));

    const ButtonContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }));

    //Const for saving the result from the api call from apiCall.js which does the api call
    const { data, status } = useAPIService();

    //https://stackoverflow.com/questions/71751607/react-app-how-to-show-only-limited-number-of-array-items

    //Variables for pagination
    const pageSize = 10;

    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationStop, setPaginationStop] = useState(pageSize);



    if (status === "loading") {
        return (
            <div>Loading</div>
        )
    }
    //const data = result.data.Data.Data;

    //Variables for page counter
    const dataLength = data.length; //kan brukes direkte
    let currentPage = paginationStop / pageSize;
    const totalPage = Math.ceil(dataLength / pageSize);

    //Function to increase or decrease paginationStart and paginationStop
    // arg: increaseBool is a boolean, when true increase pagination and when false decrease
    function paginate(increaseBool) {
        if (increaseBool) {
            if (paginationStart < (dataLength - pageSize) && paginationStop < dataLength) {
                let newStart = paginationStart + pageSize;
                let newStop = paginationStop + pageSize;
                setPaginationStart(newStart)
                setPaginationStop(newStop);
            }
        }
        else {
            if (paginationStart > 0 && paginationStop > pageSize) {
                let newStart = paginationStart - pageSize;
                let newStop = paginationStop - pageSize;
                setPaginationStart(newStart)
                setPaginationStop(newStop);
            }
        }
    }
    //Return of table
    return (
        <>
            <div>
                <Typography
                    variant="h1"
                    fontSize={40}
                    align="center"
                    padding={2}>
                    TABLE INFORMATION BITCOIN
                </Typography>

                <Container>

                    <Table>
                        <TableHead>
                            <StyledTableRowHeader>
                                <StyledTableCellHeader>Date</StyledTableCellHeader>
                                <StyledTableCellHeader>Highest value</StyledTableCellHeader>
                                <StyledTableCellHeader>Lowest value</StyledTableCellHeader>
                                <StyledTableCellHeader>Closing value</StyledTableCellHeader>
                            </StyledTableRowHeader>
                        </TableHead>
                        <TableBody>
                            {status === "loaded" &&
                                data.slice(paginationStart, paginationStop).map(entry => (
                                    <StyledTableRow>
                                        <TableCell>{unixTime(entry.time)}</TableCell>
                                        <TableCell>{entry.high}</TableCell>
                                        <TableCell>{entry.low}</TableCell>
                                        <TableCell>{entry.close}</TableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Typography
                        variant="h2"
                        fontSize={20}
                        align="center"
                        display="block"
                        padding={2}>
                        Page {currentPage} / {totalPage}
                    </Typography>
                </Container>
                <ButtonContainer>
                    <StyledPagiButton disabled={!(paginationStart > 0 && paginationStop > pageSize)}
                        onClick={() => paginate(false)}>PREVIOUS PAGE</StyledPagiButton>
                    <StyledPagiButton onClick={() => paginate(true)}>NEXT PAGE</StyledPagiButton>
                </ButtonContainer>

            </div>
        </>
    )
}


export default TableMaker;