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
    const result = useAPIService();

    //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    //https://www.tutorialrepublic.com/faq/how-to-convert-a-unix-timestamp-to-time-in-javascript.php
    //Converts unixtimestamp to readable string
    function unixToString(unixTime) {
        let date = new Date(unixTime * 1000)
        return date.toLocaleDateString("en-GB");
    }

    //https://stackoverflow.com/questions/71751607/react-app-how-to-show-only-limited-number-of-array-items

    //Variables for pagination
    const [paginationStart, setPaginationStart] = useState(0);
    const [paginationStop, setPaginationStop] = useState(20);

    //Function to increase or decrease paginationStart and paginationStop
    // arg: increaseBool is a boolean, when true increase pagination and when false decrease
    function paginate(increaseBool) {
        if (increaseBool) {
            if (paginationStart < 80 && paginationStop < 100) {
                let newStart = paginationStart + 20;
                let newStop = paginationStop + 20;
                setPaginationStart(newStart)
                setPaginationStop(newStop);
            }
        }
        else {
            if (paginationStart > 0 && paginationStop > 20) {
                let newStart = paginationStart - 20;
                let newStop = paginationStop - 20;
                setPaginationStart(newStart)
                setPaginationStop(newStop);
            }
        }
    }

    //Variables for page counter
    let currentPage = paginationStop / 20;
    const totalPage = 5; 

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
                {result.status === 'loading' && <div>Loading...</div>}
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
                            {result.status === "loaded" &&
                                result.data.Data.Data.slice(paginationStart, paginationStop).map(entry => (
                                    <StyledTableRow>
                                        <TableCell>{unixToString(entry.time)}</TableCell>
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
                    <StyledPagiButton onClick={() => paginate(false)}>PREVIOUS PAGE</StyledPagiButton>
                    <StyledPagiButton onClick={() => paginate(true)}>NEXT PAGE</StyledPagiButton>
                </ButtonContainer>

            </div>
        </>
    )
}


export default TableMaker;