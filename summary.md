## `api/orders/add/`
Type: **POST**

Input example:
```
{
    "beer_type": "ABC",
    "beer_volume": 120,
    "description": "i wanna make an order pls",
    "time_slot_ids": [1, 2]
}
```

Outputs:
```
{
    "message": "Order successfully created.",
    "id": 1
}
```
```
{
    "error": "Cannot create order for time slots with active orders."
}
```
```
{
    "error": "Cannot create order for time slots in the past."
}
```
```
{
    "error": "Invalid time slot ids."
}
```


## `api/orders/<int:order_id>/details/`
Type: **GET**
Input: `order_id`


Outputs:
```
{
    "id": 1,
    "created_at": "2025-01-16T03:02:48.983091+01:00",
    "status": "N",
    "beer_type": "ABC",
    "beer_volume": 120.0,
    "description": "i wanna make an order pls",
    "rate": null,
    "ended_at": null,
    "contract_brewery": 1,
    "recipe": null
    "timeSlots": [
        {
            "id": 12,
            "status": "F",
            "slot_type": "H",
            "price": "150.00",
            "start_timestamp": "2025-01-16T12:00:00+01:00",
            "end_timestamp": "2025-01-16T13:00:00+01:00",
            "device": 1,
            "order": 1
        }
    ]
}
```
```
{
    "error": "Order not found."
}
```
```
{
    "error": "Unauthorized to view this order."
}
```

## `api/orders/<int:order_id>/accept/`
Type: **GET**
Input: `order_id`

Outputs:
```
{
    "message": "Order successfully accepted."
}
```
```
{
    "error": "Order is not new. Cannot accept this order."
}
```
```
{
    "error": "Unauthorized to accept this order."
}
```

## `api/orders/<int:order_id>/reject/`
Type: **GET**
Input: `order_id`

Outputs:
```
{
    "message": "Order successfully rejected."
}
```
```
{
    "error": "Order is not new. Cannot reject this order."
}
```
```
{
    "error": "Unauthorized to reject this order."
}
```

## `api/orders/<int:order_id>/withdraw/`
Type: **GET**
Input: `order_id`

Outputs:
```
{
    "message": "Order successfully rejected."
}
```
```
{
    "error": "Order is not new. Cannot withdraw this order."
}
```
```
{
    "error": "Unauthorized to withdraw this order."
}
```

## `api/orders/contract/status/<str:status>/`
Type: **GET**
Input: `order_id`

Outputs:
```
[
    {
        "id": 2,
        "created_at": "2025-01-16T03:51:19.077836+01:00",
        "status": "C",
        "beer_type": "ABC",
        "beer_volume": 120.0,
        "description": "i wanna make an order pls",
        "rate": null,
        "ended_at": null,
        "contract_brewery": 1,
        "recipe": null,
        "timeSlots": [
            {
                "id": 15,
                "status": "F",
                "slot_type": "H",
                "price": "150.00",
                "start_timestamp": "2025-01-16T12:00:00+01:00",
                "end_timestamp": "2025-01-16T13:00:00+01:00",
                "device": 1,
                "order": 2
            }
        ]
    }
]
```
```
[]
```
```
{
    "error": "Unauthorized to view orders for this brewery."
}
```

## `api/orders/commercial/status/<str:status>/`
Type: **GET**
Input: `order_id`

Outputs:
```
[
    {
        "id": 2,
        "created_at": "2025-01-16T03:51:19.077836+01:00",
        "status": "C",
        "beer_type": "ABC",
        "beer_volume": 120.0,
        "description": "i wanna make an order pls",
        "rate": null,
        "ended_at": null,
        "contract_brewery": 1,
        "recipe": null,
        "timeSlots": [
            {
                "id": 15,
                "status": "F",
                "slot_type": "H",
                "price": "150.00",
                "start_timestamp": "2025-01-16T12:00:00+01:00",
                "end_timestamp": "2025-01-16T13:00:00+01:00",
                "device": 1,
                "order": 2
            }
        ]
    }
]
```
```
[]
```
```
{
    "error": "Unauthorized to view orders for this brewery."
}
```




## `api/orders/device/<int:device_id>/all/`
Type: **GET**
Input: `order_id`

Outputs:
```
{
    "id": 1,
    "created_at": "2025-01-16T03:02:48.983091+01:00",
    "status": "N",
    "beer_type": "ABC",
    "beer_volume": 120.0,
    "description": "i wanna make an order pls",
    "rate": null,
    "ended_at": null,
    "contract_brewery": 1,
    "recipe": null
    "timeSlots": [
        {
            "id": 12,
            "status": "F",
            "slot_type": "H",
            "price": "150.00",
            "start_timestamp": "2025-01-16T12:00:00+01:00",
            "end_timestamp": "2025-01-16T13:00:00+01:00",
            "device": 1,
            "order": 1
        }
    ]
}
```
```
{
    "error": "Unauthorized to view orders for this device."
}
```

## `api/orders/<int:order_id>/cancel/`
Type: **GET**
Input: `order_id`

Outputs:
```
{
    "message": "Order successfully cancelled."
}
```
```
{
    "error": "Order is not confirmed. Cannot cancel this order."
}
```
```
{
    "error": "Unauthorized to cancel this order."
}
```

## `api/orders/commercial/dashboard/`
Type: **GET**
Input: None

Outputs:
```
{
    "new_orders": [],
    "confirmed_orders": [
        {
            "id": 2,
            "created_at": "2025-01-16T03:51:19.077836+01:00",
            "status": "C",
            "beer_type": "ABC",
            "beer_volume": 120.0,
            "description": "i wanna make an order pls",
            "rate": null,
            "ended_at": null,
            "contract_brewery": {
                "name": "aaa",
                "contract_phone_number": "asdsadsda",
                "contract_email": "aaa@a.aa",
                "description": "",
                "owner_name": "aasdsadas"
            },
            "recipe": null,
            "time_slots": [
                {
                    "id": 15,
                    "status": "F",
                    "slot_type": "H",
                    "price": "150.00",
                    "start_timestamp": "2025-01-16T12:00:00+01:00",
                    "end_timestamp": "2025-01-16T13:00:00+01:00",
                    "device": {
                        "id": 1,
                        "name": "31321",
                        "serial_number": "sadsad"
                    },
                    "order": 2
                }
            ],
            "total_price": 150.0
        }
    ]
}
```
```
{
    "new_orders": [],
    "confirmed_orders": []
}
```
```
{
    "error": "Unauthorized to view orders for this brewery."
}
```