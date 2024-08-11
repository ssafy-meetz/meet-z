package com.c108.meetz.dto.request;

import lombok.Getter;
import lombok.Setter;

public record WarningRequestDto(
        int userId,
        String reason)
{ }