import React, { useState } from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfoList from "./FileSystemEntryInfoList"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup: () => void
    setFileUploadDirectory: (param: string) => void
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({ fileSystemEntryInfoDTO, openFileInputPopup, setFileUploadDirectory }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 4 //number of collumns in the table
    let sizeValue = 0
    let sizeUnit = ""

    if (fileSystemEntryInfoDTO.size != 0) {
        const getBaseLog = (val: number, base: number) => {
            return Math.log(val) / Math.log(base)
        }

        const sizeScale = Math.min(Math.floor(getBaseLog(fileSystemEntryInfoDTO.size, 1024)), 6)
        sizeValue = Math.floor((100 * fileSystemEntryInfoDTO.size) / Math.pow(1024, sizeScale)) / 100
        sizeUnit = sizeUnits[sizeScale]
    }

    let contentType: string

    switch (fileSystemEntryInfoDTO.contentType) {
        case "text/plain":
            contentType = "txt"
            break
        case "directory":
            contentType = "directory"
            break
        default:
            contentType = fileSystemEntryInfoDTO.contentType
    }

    const isDirectory = contentType === "directory"

    return (
        <>
            <tr className={isDirectory ? "directory" : ""}>
                <td>{fileSystemEntryInfoDTO.name}</td>
                <td>{contentType}</td>
                <td>{fileSystemEntryInfoDTO.uuid}</td>
                <td>
                    {sizeValue} {sizeUnit}
                </td>
                <td>
                    {isDirectory && (
                        <button
                            onClick={() => {
                                openFileInputPopup()
                                setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Upload here
                        </button>
                    )}
                </td>
            </tr>
            {isDirectory && (
                <tr className="directory">
                    <td
                        colSpan={colSpan}
                        onClick={() => {
                            setShowFileArray(!showFileArray)
                        }}
                    >
                        {showFileArray ? (
                            <>
                                ▼
                                <FileSystemEntryInfoList
                                    fileSystemEntriesInfoDTO={fileSystemEntryInfoDTO.children}
                                    openFileUploadPopup={openFileInputPopup}
                                    setFileUploadDirectory={setFileUploadDirectory}
                                />
                            </>
                        ) : (
                            <>►</>
                        )}
                    </td>
                </tr>
            )}
        </>
    )
}

export default FileSystemEntryInfo
